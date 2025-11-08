import LoginPage from "@/components/modules/Auth/LoginPage";

const Login = async ({ searchParams }: { searchParams?: Promise<{ redirect?: string }> }) => {
    const params = (await searchParams) || {};

    return (
        <>
            <LoginPage redirect={params.redirect} />
        </>
    );
};

export default Login;