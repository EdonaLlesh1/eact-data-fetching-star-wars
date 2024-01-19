import { useRouter } from "next/router";
import useSWR from "swr";
import Card from "../../components/Card";
import Layout from "../../components/Layout";

const fetcher = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error ("Failed to fetch data");
  }
  return response.json();
};

export default function Character() {
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useSWR(id ? `https://swapi.dev/api/people/${id}` : null, fetcher);

  if (error) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <Card
        id={data.id}
        name={data.name}
        height={data.height}
        eyeColor={data.eye_color}
        birthYear={data.birth_year}
      />
    </Layout>
  );
}
