import { useRouter } from "next/router";
import Layout from "../../../components/Layout";
import MyPageView from "../../../components/MyPageView";
import axios from "axios";

type PageViewProps = {
  pageData: any;  // Accept the entire page data as a prop
};

const PageView: React.FC<PageViewProps> = ({ pageData }) => {
  const router = useRouter();
  const { pageName } = router.query; // Use the dynamic segment to fetch pageName from URL

  if (!pageName) return <div>Loading...</div>;

  return (
    <Layout noLayout>
        {/* Pass the entire pageData to MyPageView */}
        <MyPageView pageData={pageData} />
    </Layout>
  );
};

// Assign 'noLayout' directly to the component
(PageView as any).noLayout = true;  // Explicitly attach the 'noLayout' property to the component

export default PageView;

export const getServerSideProps = async (context: any) => {
  const { pageName } = context.params;

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/memory/${pageName}`
    );
    const pageData = res.data.page_data;

    // Handle cases where the data is missing or invalid
    if (!pageData) {
      return { notFound: true };
    }

    return {
      props: { pageData }, // Pass the fetched data as a prop
    };
  } catch (error) {
    console.error(error);
    return { notFound: true }; // Show 404 page if there's an error fetching data
  }
};
