import { mkdir, writeFile, rename } from 'node:fs/promises'
const rows = Array(151)
let next = 1
async function worker() {
  while (next <= 151) {
    const id = next++
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
      signal: AbortSignal.timeout(15000),
    })
    if (!response.ok) throw new Error(`Pokemon ${id}: HTTP ${response.status}`)
    const value = await response.json()
    if (value.id !== id || !value.name || !Array.isArray(value.types))
      throw new Error(`Invalid Pokemon ${id}`)
    rows[id - 1] = {
      id,
      name: value.name,
      types: value.types.map((item) => item.type.name),
      height: value.height,
      weight: value.weight,
      stats: value.stats.map((item) => ({ name: item.stat.name, value: item.base_stat })),
      cry: value.cries?.latest ?? '',
    }
  }
}
await Promise.all(Array.from({ length: 4 }, worker))
if (rows.some((row, index) => row?.id !== index + 1)) throw new Error('Incomplete Kanto catalog')
const output = new URL('../src/data/kanto.json', import.meta.url)
await mkdir(new URL('../src/data/', import.meta.url), { recursive: true })
await writeFile(new URL(output.href + '.tmp'), JSON.stringify(rows) + '\n')
await rename(new URL(output.href + '.tmp'), output)
console.log(`Validated ${rows.length} cached Kanto records.`)
