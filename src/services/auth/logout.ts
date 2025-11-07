/* eslint-disable @typescript-eslint/no-explicit-any */
const logoutUser = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        const data = await res.json();

        return data;
    } catch (err: any) {
        throw new Error(
            err.message || "An error occurred while logging in."
        );
    }
};

export default logoutUser;