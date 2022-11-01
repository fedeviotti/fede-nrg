import React from "react";
import { Box } from "@chakra-ui/react";

const Crypto = () => {
  const [data, setData] = React.useState<any>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/crypto", {
        method: "GET",
        headers: new Headers({ "Content-Type": "application/json" }),
        credentials: "same-origin",
      });
      const result = await response.json();
      setData(result.data);
    };
    fetchData();
  }, []);

  if (!data) return <Box>Loading ...</Box>;

  return (
    <Box>
      {data.map((el: any) => <Box key={el.id}>{el.name}</Box>)}
    </Box>
  );
};

export default Crypto;
