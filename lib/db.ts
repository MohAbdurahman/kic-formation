export async function getData<T>(section: string, defaultData: T): Promise<T> {
  try {
    const res = await fetch(`/api/data/${section}`);
    if (!res.ok) return defaultData;
    const json = await res.json();
    return json ?? defaultData;
  } catch {
    return defaultData;
  }
}

export async function saveKicData(section: string, data: object): Promise<void> {
  const res = await fetch(`/api/data/${section}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Sauvegarde échouée');
}
