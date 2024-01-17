import fetchApi from '@/lib/fetch';
import { ethers } from 'ethers';
import { Record__factory } from '@recordex/smartcontract/typechain-types';
import { calcFileHash } from '@/lib/calcFileHash';

/**
 * ファイルの記録を新規作成する
 * file のハッシュ値を求め、そのハッシュ値をレコードコントラクトに記録し、file の本体を GCS にアップロードする
 * 参考: https://github.com/dethcrypto/TypeChain/issues/521
 */
export const createRecord = async (
  token: string,
  file: File,
): Promise<PostRecordResponse> => {
  if (!file) {
    return Promise.reject(
      new Error(`ファイルが指定されていません。file -> ${file}`),
    );
  }
  const fileHash = await calcFileHash(file);
  console.log(`fileName -> ${file.name} fileHash -> ${fileHash}`);
  // 参考: https://stackoverflow.com/questions/60785630/how-to-connect-ethers-js-with-metamask
  // 参考: https://www.npmjs.com/package/@metamask/providers
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  const recordFactory = Record__factory.connect(
    '0xC3e4bb03b22C7DcB3715A2f973f25Ba72d9A2e37',
    signer,
  );
  const recordContract = recordFactory.connect(signer);
  // ブロックチェーンに記録されている最新のファイルハッシュ値を取得
  const fileMetaDataHistory =
    await recordContract.getFileMetadataHistory(fileHash);
  const newestFileHash =
    fileMetaDataHistory[fileMetaDataHistory.length - 1].hash;
  // ブロックチェーンにファイルのハッシュ値を記録
  const addFile = await recordContract.addFile(
    file.name,
    fileHash,
    newestFileHash,
  );
  console.log(
    `トランザクションの送信に成功しました。network -> ${signer.provider._network.name}, transactionHash -> ${addFile.hash})`,
  );
  const formData = new FormData();
  // ファイルとトランザクションハッシュを FormData に追加
  formData.append('file', file);
  formData.append('transaction_hash', addFile.hash);
  const response = await fetchApi<PostRecordRequest, PostRecordResponse>(
    token,
    'POST',
    `/record`,
    formData,
  );
  return response.data;
};

type PostRecordRequest = FormData;

type PostRecordResponse = {
  file_name: string;
  transaction_hash: string;
};
