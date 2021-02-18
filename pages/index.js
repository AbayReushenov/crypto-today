import Head from 'next/head';
import styles from '../styles/Home.module.css';
import CoinGecko from 'coingecko-api';
const coinGeckoClient = new CoinGecko();

export default function Home(props) {
  const { data } = props.result;
  console.log(data);
  const formatPercent = (number) => `${new Number(number).toFixed(2)}%`;

  const formatDollar = (number, maximumSignificantDigits) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumSignificantDigits,
    }).format(number);

  return (
    <div className={styles.container}>
      <Head>
        <title>Криптовалюты</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h4>Криптовалюты в реальном времени</h4>
      <div class="table-responsive-sm">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Символ</th>
              <th scope="col">24часа изм.</th>
              <th scope="col">Цена</th>
              <th scope="col">Рыночная капитализация</th>
            </tr>
          </thead>
          <tbody>
            {data.map((coin, index) => (
              <tr key={coin.id}>
                <th scope="row">{index + 1}</th>
                <td>
                  <img
                    src={coin.image}
                    style={{ width: 25, height: 25, marginRight: 10 }}
                  />
                  {coin.symbol.toUpperCase()}
                </td>
                <td>
                  <span
                    className={
                      coin.price_change_percentage_24h > 0
                        ? 'text-success'
                        : 'text-danger'
                    }
                  >
                    {formatPercent(coin.price_change_percentage_24h)}
                  </span>
                </td>
                <td>{formatDollar(coin.current_price, 20)}</td>
                <td>{formatDollar(coin.market_cap, 12)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const params = {
    order: CoinGecko.ORDER.MARKET_CAP_DESC,
  };
  const result = await coinGeckoClient.coins.markets({ params });
  return {
    props: {
      result,
    },
  };
}
