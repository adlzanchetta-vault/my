import React from "react";


// // SUB OBJECT //////////////////////////////////////////////////////////////////////////////////

const SocialMediaProvideLink = ({profile}) => {
  return (
    <a href={`${profile.profile_url}` }
       style={ {color: profile.name_color} }
       target="_blank" rel="noreferrer" >
      <img src={`${process.env.GATSBY_BASE_URL}${profile.logo_img}`}
           alt={profile.name} className="social_media_icon" />
      <span>{profile.name}</span>
    </a>
  );
}


const SocialMediaProvideNoLink = ({profile}) => {
  return (
    <>
      <img src={`${process.env.GATSBY_BASE_URL}${profile.logo_img}`}
           alt={profile.name} className="social_media_icon" />
      <span style={{color: profile.name_color}}>
        {profile.name}
      </span>
    </>
  );
}


const SocialMediaProvideItem = ({profile}) => {
  return (
    profile.profile_url ? SocialMediaProvideLink({profile}) : SocialMediaProvideNoLink({profile})
  );
}


const SocialMediaProfile = (profile, idx) => {
  return (
    <div className="social_media_profile" key={idx} >
      <SocialMediaProvideItem profile={profile} />
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
