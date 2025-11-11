import Footer from "@/components/shared/Footer";
import NavbarServer from "@/components/shared/Navbar.server";

const CommonLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <div>
            <NavbarServer />
            <main className="min-h-dvh">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default CommonLayout;