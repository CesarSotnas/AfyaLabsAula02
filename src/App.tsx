import React, { useCallback, useEffect, useState } from "react";
import { api } from "./services/api";
import { uuid } from "uuidv4";

interface IData {
  id: string;
  name: string;
  price: number;
}

const App: React.FC = () => {
  const [data, setData] = useState<IData[]>([]);
  const [fruta, setFruta] = useState<string>("");
  const [frutaValue, setFrutaValue] = useState<any>("");

  useEffect(() => {
    console.log(data);
    api.get("data").then((response) => {
      setData(response.data);
    });
  }, [data]);

  const addToApi = useCallback(() => {
    api
      .post("data", {
        id: uuid,
        name: fruta,
        price: frutaValue,
      })
      .then((response) => alert("Tudo certo"))
      .catch((e) => alert("Error"));
  }, [uuid, fruta, frutaValue]);

  const convertoToCurrency = useCallback(
    (value: number) =>
      Intl.NumberFormat("pt-br", {
        style: "currency",
        currency: "BRL",
      }).format(value / 100),
    []
  );

  return (
    <div>
      <h1>Hello</h1>

      <ul>
        {data.map((fruta) => (
          <li key={fruta.id}>
            {fruta.name} | {convertoToCurrency(fruta.price)}
          </li>
        ))}
      </ul>

      <h1>{fruta}</h1>
      <hr />
      <input
        type="text"
        onChange={(e) => setFruta(e.target.value)}
        placeholder="Qual fruta?"
      />
      <input
        type="number"
        onChange={(e) => setFrutaValue(parseFloat(e.target.value))}
        placeholder="Qual Valor?"
      />
      <button onClick={addToApi}>Adicionar</button>
    </div>
  );
};

export default App;
