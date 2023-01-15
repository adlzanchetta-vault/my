import React from "react";


// // SUB OBJECT //////////////////////////////////////////////////////////////////////////////////

const SocialMediaProvideLink = ({profile}) => {
    let retObj = null;
    if (profile.profile_url) {
      retObj = (
        <a href={`${profile.profile_url}` }
           style={ {color: profile.name_color} }
           target="_blank" rel="noreferrer" >
          <img src={`${process.env.GATSBY_BASE_URL}${profile.logo_img}`}
             alt={profile.name} className="social_media_icon" />
          <span>{profile.name}</span>
        </a>
      );
    } else {
      retObj = (
        <>
          <img src={`${process.env.GATSBY_BASE_URL}${profile.logo_img}`}
            alt={profile.name} className="social_media_icon" />
          <span style={{color: profile.name_color}}>
            {profile.name}
          </span>
        </>
      );
    }
  
    return (retObj);
}


const SocialMediaProfile = (profile) => {
  return (
    <div className="social_media_profile">
      <SocialMediaProvideLink profile={profile} />
    </div>
  );
}


// // MAIN OBJECT /////////////////////////////////////////////////////////////////////////////////

export default function SocialMediaProfiles({label, profiles}) {
  return (
    <div className="social_media_profiles" >
      <p>{label}</p>
      { profiles.map(SocialMediaProfile) }
    </div>
  );
};
