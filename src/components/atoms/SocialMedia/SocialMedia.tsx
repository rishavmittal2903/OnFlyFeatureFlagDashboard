import { BsGoogle, BsTwitter } from "react-icons/bs"
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa"

const SocialMedia=()=>{
    return(
        <div className="social-media">
        <a href="/#" className="social-icon">
          <FaFacebookF />
        </a>
        <a href="/#" className="social-icon">
          <BsTwitter />
        </a>
        <a href="/#" className="social-icon">
          <BsGoogle />
        </a>
        <a href="/#" className="social-icon">
          <FaLinkedinIn />
        </a>
      </div>
    )
}

export default SocialMedia;