import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

const CommonLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <div>
            <Navbar />
            <main className="min-h-dvh">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default CommonLayout;