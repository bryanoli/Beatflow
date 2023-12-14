import React, { useState } from 'react';
import '../App.css';
import '../styles/pages/Discover.css';
import useAuth from '../authentication/auth';

// const CLIENT_ID = 'YOUR_CLIENT_ID';
// const CLIENT_SECRET = ''

export default function Discover({ code }) {
    const accessToken = useAuth(code);
    // Dummy data for featured playlists
    const featuredPlaylists = [
      { id: 1, name: 'Top Hits', imageUrl: 'url-to-image-1' },
      { id: 2, name: 'Discover Weekly', imageUrl: 'url-to-image-2' },
      // Add more playlists as needed
    ];
  
    return (
      <div className="discover-container">
        <h1>{code}</h1>
      </div>
    );
  }