export function statuses() {
  return [
    {
      name: "En service",
      borrowable: true,
    },
    {
      name: "En maintenance",
      borrowable: false,
    },
    {
      name: "Perdu",
      borrowable: false,
    },
    {
      name: "Vendu",
      borrowable: false,
    }
  ]
}
