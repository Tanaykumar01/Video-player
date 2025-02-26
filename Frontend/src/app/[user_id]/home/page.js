'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getAllVideos } from '@/api/getAllVideos.js';
import hitRequest from '@/api/hitReq';
import { useParams } from 'next/navigation';

const Page = () => {
    const [videos, setVideos] = useState([]);
    const [user, setUser] = useState(null);
    const [loadingVideos, setLoadingVideos] = useState(true);
    const { user_id } = useParams();

    // Fetch user details
    useEffect(() => {
        const fetchUserChannel = async () => {
            try {
                const res = await hitRequest(`/users/channel/${user_id}`, "GET");
                setUser(res?.data);
            }
            catch (err) {
                console.error(err);
            }
        }
        fetchUserChannel();
    }, [user_id]);

    // Fetch videos and filter by user id
    useEffect(() => {
        const fetchVideos = async () => {
            if (user) {
                setLoadingVideos(true);
                const res = await getAllVideos();
                if (res) {
                    const userVideos = res.filter(video => video.owner === user._id);
                    setVideos(userVideos);
                }
                setLoadingVideos(false);
            }
        };
        if (user) fetchVideos(); // Fetch videos only after user is fetched
    }, [user]);

    if (loadingVideos) {
        return <div>Loading videos...</div>;
    }

    return (
        <div className='flex flex-col'>
            <div>Recently uploaded videos</div>
            <div>Popular video</div>
            <div>Recommended videos</div>
            <div>Playlist</div>
        </div>
    );
};

export default Page;
