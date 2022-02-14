import Card from "~/components/Card/Card";
import DataTable from "~/components/DataTable/DataTable";
import Title from "~/components/Title/Title";

export default function Index() {
  return (
    <Card>
      <Title title="Matériel" />
      <DataTable
        columns={[
          {
            Header: "Numéro",
            accessor: "number",
          },
          {
            Header: "Marque",
            accessor: "brand",
          },
          {
            Header: "Modèle",
            accessor: "model"
          },
          {
            Header: "Emprunté",
            accessor: "tenant"
          }
        ]}
        data={[
          {
            number: 1,
            brand: "Aqualung",
            model: "Calipso",
            description: "Complet 1er étage, octo, mano",
            tenant: false
          }
        ]}
      />
    </Card>
  )
}
