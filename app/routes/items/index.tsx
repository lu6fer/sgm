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
            Header: "Nom",
            accessor: "name",
          },
          {
            Header: "Description",
            accessor: "description",
          },
          {
            Header: "Prix",
            accessor: "price",
          }
        ]}
        data={[
          {
            name: "test",
            description: "test",
            price: "test",
          }
        ]}
      />
    </Card>
  )
}
