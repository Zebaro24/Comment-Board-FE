export async function getTextFileContent(url: string): Promise<string> {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to load text file');
    return res.text();
}