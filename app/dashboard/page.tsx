import { Flex } from "@radix-ui/themes";
import _ from "lodash";
import BerChartComponent from "../components/BarChartComponent";
import { getGeneralAccounts } from "../_utils/generalAccount/getGeneralAccounts";
import { getProducts } from "../_utils/product/getProducts";
import { Metadata } from "next";

const DashboardHomePage = async () => {
  const generalAccounts = await getGeneralAccounts();

  const barChartGeneralAccounts = generalAccounts.map((account) => ({
    name: account.name,
    debit: parseFloat(account.debitSold.toString()),
    credit: parseFloat(account.creditSold.toString()),
  }));

  const AccountBarChartWidth = generalAccounts.length * 150 + 100;

  const products = await getProducts();

  const productBarChartWith = products.length * 120 + 100;

  const barChartProducts = products.map((product) => ({
    name: product.name,
    debit: parseFloat(product.stock.toString()),
    credit: 0,
  }));

  return (
    <Flex direction="column" gap="4">
      <BerChartComponent
        title="Soldes des comptes généraux:"
        data={barChartGeneralAccounts}
        width={
          AccountBarChartWidth > productBarChartWith
            ? AccountBarChartWidth
            : productBarChartWith
        }
      />
      <BerChartComponent
        title="Quantité des produits:"
        data={barChartProducts}
        width={
          AccountBarChartWidth > productBarChartWith
            ? AccountBarChartWidth
            : productBarChartWith
        }
        onBar={true}
      />
    </Flex>
  );
};

export const metadata: Metadata = {
  title: "Claivre - Tableau de Bord",
  description:
    "**Tableau de Bord** : Votre centre de commande ultime pour une gestion financière simplifiée. Grâce à notre tableau de bord intuitif, vous pouvez facilement visualiser et suivre vos flux financiers à l'aide de représentations graphiques telles que des lignes et des barres. Prenez le contrôle total de vos comptes en un seul clic. Modifiez, ajustez et personnalisez vos paramètres de compte selon vos besoins, le tout depuis une interface conviviale et accessible. La gestion de vos finances n'a jamais été aussi claire et efficace qu'avec le tableau de bord Claivre.",
};

export default DashboardHomePage;
