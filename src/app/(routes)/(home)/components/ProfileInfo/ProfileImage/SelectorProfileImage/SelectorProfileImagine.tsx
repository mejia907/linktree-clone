import { useState } from "react"
import { SelectorProfileImageProps } from "./SelectorProfileImage.types"
import TabSelector from "./TabSelector/TabSelector"
import TabUploadImage from "./TabUploadImage/TapUploadImage"
import TabDeleteImage from "./TabDeleteImage/TabDeleteImage"

export default function SelectorProfileImagine(props: SelectorProfileImageProps) {

  const { setShowDialog } = props

  const [showTab, setShowTab] = useState<"upload" | "delete" | null>(null)

  return (
    <div className="pt-4">
      {!showTab && <TabSelector setShowTab={setShowTab} />}
      {showTab === "upload" && (
        <TabUploadImage setShowDialog={setShowDialog} setShowTab={setShowTab} />
      )}
      {showTab === "delete" && (
        <TabDeleteImage setShowDialog={setShowDialog} setShowTab={setShowTab} />
      )}
    </div>
  );
}