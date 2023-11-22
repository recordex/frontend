// 関数の解説(gpt-4): https://chat.openai.com/share/1c32b364-f0fd-4490-8945-fb9cf08c4742
export const calcFileHash = async (file: File): Promise<string> => {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return '0x' + hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
};
