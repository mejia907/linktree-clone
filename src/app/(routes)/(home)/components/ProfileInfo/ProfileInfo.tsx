import BlockInfo from "./BlockInfo/BlockInfo";
import EditBackground from "./EditBackground/EditBackground";
import AddLinkForm from "./ProfileImage/AddLinkForm/AddLinkForm";
import ProfileImage from "./ProfileImage/ProfileImage";
import { ProfileInfoProps } from "./ProfileInfo.types";

export default function ProfileInfo(props: ProfileInfoProps) {

  const { onReload } = props

  {/* Información de perfil */}
  return (
    <div className="mt-10 max-w-2xl mx-auto">
      <div className="flex flex-row pb-lg space-x-sm items-center justify-between">
        <ProfileImage />
        <BlockInfo />
        <EditBackground onReload={onReload} />
      </div>
      <AddLinkForm onReload={onReload} />
    </div>
  );
}