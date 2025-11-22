import MyProfile from "@/components/modules/MyProfile/MyProfile";
import { getMeUser } from "@/services/user/getMeUser";

const MyProfilePage = async () => {
    const userInfo = await getMeUser();
    return <MyProfile userInfo={userInfo} />;
};

export default MyProfilePage;