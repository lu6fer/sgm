import Card from "~/components/Card/Card";
import DataTable, { SelectColumnFilter } from "~/components/DataTable/DataTable";
import Title from "~/components/Title/Title";
import Back from "~/components/Back/Back";

const cols = [
  {
    Header: "Numéro",
    accessor: "number",
    disableFilters: true,
  },
  {
    Header: "Type",
    accessor: "type",
    Filter: SelectColumnFilter,
    filter: 'includes',
  },
  {
    Header: "Marque",
    accessor: "brand",
    Filter: SelectColumnFilter,
    filter: 'includes',
  },
  {
    Header: "Modèle",
    accessor: "model",
    Filter: SelectColumnFilter,
    filter: 'includes',
  },
  {
    Header: "Emprunté",
    accessor: "tenant"
  }
];

const data = [
  {
    number: 1,
    brand: "Aqualung",
    model: "Calipso",
    description: "Complet 1er étage, octo, mano",
    type: "Détendeur",
    tenant: false
  },
  {
    number: 2,
    brand: "Scubapro",
    model: "t-one",
    type: "Gillet",
    description: "M",
    tenant: false
  },
  {
    number: 3,
    brand: "Aqualung",
    model: "Calipso",
    type: "Détendeur",
    description: "Complet 1er étage, octo, mano",
    tenant: false
  },
  {
    number: 4,
    brand: "Scubapro",
    model: "t-one",
    type: "Gillet",
    description: "M",
    tenant: false
  },
  {
    number: 5,
    brand: "Aqualung",
    model: "Calipso",
    type: "Détendeur",
    description: "Complet 1er étage, octo, mano",
    tenant: false
  },
  {
    number: 6,
    brand: "Scubapro",
    model: "t-one",
    type: "Gillet",
    description: "M",
    tenant: false
  }
];

export default function Index() {
  return (
    <Card>
      <div className="flex items-center">
        <Back />
        <Title title="Matériel" />
      </div>
      <DataTable
        search
        columns={cols}
        data={data}
      />
    </Card>
  )
}
