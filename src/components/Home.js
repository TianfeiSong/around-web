import React, { useEffect, useState } from 'react';
import SearchBar from "./SearchBar";
import { Col, message, Row, Tabs } from 'antd';
import { BASE_URL, SEARCH_KEY, TOKEN_KEY } from "../constants";
import axios from "axios";
import PhotoGallery from "./PhotoGallery";
import CreatePostButton from "./CreatePostButton";

const { TabPane } = Tabs;

function Home(props) {
    const [activeTab, setActiveTab] = useState('image');
    const [posts, setPosts] = useState([]);
    const [searchOption, setSearchOption] = useState({
        type: SEARCH_KEY.all,
        keyword: ''
    });

    //fetch data
    useEffect(() => {
        console.log('in effect', searchOption);
        fetchPost(searchOption);
    }, [searchOption]);

    const fetchPost = option => {
        const { type, keyword } = option;
        let url = "";
        if (type === SEARCH_KEY.all) {
            url = `${BASE_URL}/search`;
        } else if (type === SEARCH_KEY.user) {
            url = `${BASE_URL}/search?user=${keyword}`;
        } else {
            url = `${BASE_URL}/search?keywords=${keyword}`;
        }

        const opt = {
            method: "GET",
            url: url,
            headers: {
                Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`
            }
        };

        axios(opt)
            .then(res => {
                if (res.status === 200) {
                    setPosts(res.data);
                }
            })
            .catch((err) => {
                message.error("Fetch posts failed!");
                console.log("fetch posts failed: ", err.message);
            })
    }

    const renderPost = type => {
        console.log('post -> ',  posts)
        // case1: post empty => no data
        // case2: type === image -> image
        // case3: type === video -> video
        if (!posts || posts.length === 0) {
            return <div>no data!</div>;
        }
        if (type === 'image') {
            const imageArr = posts
                .filter(item => item.type === "image")
                .map(image => {
                    return {
                        src: image.url,
                        user: image.user,
                        caption: image.message,
                        thumbnail: image.url,
                        thumbnailWidth: 300,
                        thumbnailHeight: 200
                    };
                });
            return <PhotoGallery images={imageArr}/>;
        } else if (type === 'video') {
            return (
                <Row gutter={32}>
                    {posts
                        .filter((post) => post.type === "video")
                        .map((post) => (
                            <Col span={8} key={post.url}>
                                <video src={post.url} controls={true} className="video-block" />
                                <p>
                                    {post.user}: {post.message}
                                </p>
                            </Col>
                        ))
                    }
                </Row>
            );
        }
    };

    const handleSearch = (value) => {
        console.log('home', value);
        const { type, keyword } = value;
        setSearchOption({type: type, keyword: keyword});
    }

    const showPost = (type) => {
        console.log(type);
        setActiveTab(type);
        setTimeout(setSearchOption({type: SEARCH_KEY.all, keyword: ""}), 3000);
    }

    const operations = <CreatePostButton onShowPost={showPost}>Upload</CreatePostButton>
    return (
        <div className="home">
            <SearchBar handleSearch={handleSearch}/>
            <div className="display">
                <Tabs defaultActiveKey="image"
                      onChange={ key => setActiveTab(key)}
                      activeKey={activeTab}
                      tabBarExtraContent={operations}
                >
                    <TabPane tab="Image" key="image">
                        {
                            renderPost('image')
                        }
                    </TabPane>
                    <TabPane tab="Video" key="video">
                        {
                            renderPost('video')
                        }
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );
}

export default Home;