import React, { useState, useEffect } from 'react';
import '../../styles/profile.css';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3000/api/food-partner/${id}`, { withCredentials: true })
            .then(response => {
                setProfile(response.data.foodPartner);
                setVideos(response.data.foodPartner.foodItems || []);
            })
            .catch(err => console.error("Error fetching profile:", err));
    }, [id]);

    const handleLogout = async () => {
        try {
            await axios.get("http://localhost:3000/api/auth/food-partner/logout", { withCredentials: true });
            navigate("/food-partner/login");
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    return (
        <main className="profile-page">
            {/* Instagram Style Top Bar */}
            <header className="profile-top-nav">
                <button className="back-btn" onClick={() => navigate(-1)}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                </button>
                <h2 className="top-username">{profile?.name || 'Profile'}</h2>
                <button className="logout-text-btn" onClick={handleLogout}>Logout</button>
            </header>

            <section className="profile-header-container">
                <div className="profile-main-row">
                    <div className="avatar-wrapper">
                        <img className="profile-avatar-img" src="https://via.placeholder.com/150" alt="profile" />
                    </div>
                    <div className="profile-stats-row">
                        <div className="stat-block">
                            <span className="stat-num">{videos.length}</span>
                            <span className="stat-label">Posts</span>
                        </div>
                        <div className="stat-block">
                            <span className="stat-num">{profile?.totalMeals || 0}</span>
                            <span className="stat-label">Meals</span>
                        </div>
                    </div>
                </div>
                
                <div className="profile-bio-section">
                    <h1 className="bio-name">{profile?.name}</h1>
                    <p className="bio-address">{profile?.address}</p>
                </div>

                <button className="edit-btn">Edit Profile</button>
            </section>

            <div className="grid-tabs">
                <div className="tab-item active">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
                </div>
            </div>

            <section className="insta-grid">
                {videos.map((v) => (
                    <div key={v._id} className="grid-item">
                        <video src={v.video} muted />
                        <div className="grid-item-overlay">
                            <span>▶ {v.likeCount || 0}</span>
                        </div>
                    </div>
                ))}
            </section>
        </main>
    );
};

export default Profile;