import { getSession } from "next-auth/react";
import { ROUTES } from "../utils/routes";

const Dashboard = ({ user }) => {
    return (
        <div>
            <h1>Welcome, {user?.name}!</h1>
            <p>This is your secure dashboard.</p>
        </div>
    );
};

export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: `${ROUTES.Login}`,
                permanent: false,
            },
        };
    }

    return {
        props: {
            user: session.user, // Pass user data to the component
        },
    };
}

export default Dashboard;
