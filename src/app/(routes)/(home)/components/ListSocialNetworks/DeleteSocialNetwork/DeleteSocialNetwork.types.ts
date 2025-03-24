import { Link } from "@prisma/client";

export type DeleteSocialNetworkProps = {
  link: Link
  onReload: React.Dispatch<React.SetStateAction<boolean>>
};