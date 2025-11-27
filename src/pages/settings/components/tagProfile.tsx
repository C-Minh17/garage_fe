import { useEffect, useState } from "react"
import { getProfile } from "../../../services/api/profileApi"

const tagProfile = ({ logout }: { logout?: () => void }) => {
  const [dataProfile, setDataProfile] = useState<MProfile.IRecord>()
  const [isReload, setIsReload] = useState<boolean>(false)

  useEffect(() => {
    getProfile().then(res => setDataProfile(res as any))
  }, [isReload])

  return (
    <div>
      <div>
        <div>
          <img src={"/"} alt="Avatar" />
        </div>
        <div>
          {"Minh Công"}
        </div>
      </div>
    </div>
  )
}

export default tagProfile