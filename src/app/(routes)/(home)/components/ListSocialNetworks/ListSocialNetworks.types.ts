import { Link } from "@prisma/client";

export type ListSocialNetworksProps = {
  links: Link[]
  onReload: React.Dispatch<React.SetStateAction<boolean>>
};