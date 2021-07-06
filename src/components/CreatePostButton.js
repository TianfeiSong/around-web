import React, { useState } from 'react';
import {Button, message, Modal} from "antd";
import ReferencedPostForm from "./PostForm";
import { BASE_URL, TOKEN_KEY } from "../constants";
import axios from "axios";

function CreatePostButton(props) {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [postForm, setPostForm] = useState(null);

    const showModal = () => {
        // console.log('postForm -> ',postForm);
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setConfirmLoading(true);
        // get form data
        console.log(postForm);
        postForm.validateFields()
            .then(form => {
                console.log('form->', form);
                // step1: get info about message / image / video
                const { description, dragger } = form;
                const { type, originFileObj } = dragger[0];

                // step2: check file type: image / video
                const postType = type.match(/^(image|video)/g)[0];

                // step3: prepare image / video data and send to the server
                if (postType) {
                    let formData = new FormData();
                    formData.append("message", description);
                    formData.append("media_file", originFileObj)

                    const opt = {
                        method: "POST",
                        url: `${BASE_URL}/upload`,
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`
                        },
                        data: formData
                    };

                    axios(opt)
                        .then(res => {
                            if (res.status === 200) {
                                message.success("The image / video is uploaded!");
                                postForm.resetFields();
                                handleCancel();
                                props.onShowPost(postType);
                                setConfirmLoading(false);
                            }
                        })
                        .catch(e => {
                           console.log('uploading error -> ', e.message);
                           message.error("Failed to upload image / video!")
                        });
                }
            })
            .catch(e => {
                console.log('err ir validate form -> ', e.message);
            });
    };

    const handleCancel = () => {
        console.log("Clicked cancel button.")
        setIsModalVisible(false);
    };

    return (
        <div>
            <Button type="primary" onClick={showModal}>
                Create New Post
            </Button>
            <Modal title="Create New Post"
                   visible={isModalVisible}
                   confirmLoading={confirmLoading}
                   onOk={handleOk}
                   onCancel={handleCancel}
            >
                <ReferencedPostForm ref={refInstance => setPostForm(refInstance)}/>
            </Modal>
        </div>
    );
}

export default CreatePostButton;