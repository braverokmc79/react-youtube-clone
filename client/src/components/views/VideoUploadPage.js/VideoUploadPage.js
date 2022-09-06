import React from 'react'
import { Button, Form, Input, Icon, message } from 'antd';
import Title from 'antd/lib/typography/Title';
import TextArea from 'antd/lib/input/TextArea';
import Dropzone from 'react-dropzone'
import { useState } from 'react';
import { Select } from 'antd';
import Axios from "axios";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const { Option } = Select;


const PrivateOptions = [
    { value: 0, label: "Private" },
    { value: 1, label: "Public" }
]

const CateogryOptions = [
    { value: 0, label: "Film & Animation" },
    { value: 1, label: "Autos & Vehicles" },
    { value: 2, label: "Music" },
    { value: 3, label: "Pets & Animals" }
]

function VideoUploadPage() {
    const user = useSelector(state => state.user);
    const navigate = useNavigate();

    const [VideoTitle, setVideoTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [Private, setPrivate] = useState(0);
    const [Category, setCategory] = useState("Film & Animation");
    const [FilePath, setFilePath] = useState("");
    const [Duration, setDuration] = useState("");
    const [ThumbnailPath, setThumbnailPath] = useState("");


    const onTitleChange = (e) => {
        setVideoTitle(e.currentTarget.value);
    }

    const onDescriptionChange = (e) => {
        setDescription(e.currentTarget.value);
    }

    const onPrivateChange = (e) => {
        setPrivate(e);
    }

    const onCategoryChange = (e) => {
        setCategory(e);
    }

    const onDrop = (files) => {

        let formData = new FormData();
        const config = {
            header: { 'Content-Type': 'multipart/form-data' }
        }
        console.log("1.업로드 전(files ):", files[0]);
        formData.append("file", files[0]);

        Axios.post("/api/video/uploadfiles", formData, config).then(res => {
            if (res.data.success) {
                console.log("2.업로드 후(files ): ", res.data);
                // destination: "uploads/"
                // encoding: "7bit"
                // fieldname: "file"
                // filename: "1662355212218_sample.mp4"
                // mimetype: "video/mp4"
                // originalname: "sample.mp4"
                // path: "uploads\\1662355212218_sample.mp4"
                // size: 10198832
                // success: true
                let variable = {
                    url: res.data.destination + res.data.filename,
                    fieldName: res.data.fieldname,
                }

                setFilePath(variable.url);

                Axios.post('/api/video/thumbnail', variable)
                    .then(res => {
                        if (res.data.success) {
                            console.log("썸네일 :", res.data);
                            setDuration(res.data.fileDuration);
                            setThumbnailPath(res.data.url);

                        } else {
                            alert("썸네일 생성에 실패 했습니다.");
                        }
                    });

            } else {
                alert("업로드에 실패하였습니다.");
            }
        }).catch(err => {
            console.log("에러 :", err);
            alert(err.message);
        })

    }

    const onSubmit = (e) => {
        e.preventDefault();
        const variables = {
            writer: user.userData._id,
            title: VideoTitle,
            description: Description,
            privacy: Private,
            filePath: FilePath,
            category: Category,
            duration: Duration,
            thumbnail: ThumbnailPath,
        }


        Axios.post("/api/video/uploadVideo", variables)
            .then(res => {
                if (res.data.success) {
                    message.success('성공적으로 업로드를 했습니다.');
                    setTimeout(() => {
                        navigate("/");
                    }, 3000);
                } else {
                    alert('비디오 업로드에 실패 했습니다.');
                }
            })
    }


    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}>업로드 비디오</Title>
            </div>

            <Form>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {/* Drop zone  */}


                    <Dropzone multiple={false} onDrop={onDrop} maxSize={1000000000000} >
                        {({ getRootProps, getInputProps }) => (
                            <div style={{
                                width: "100%", height: 240, border: '1px solid lightgray',
                                alignItems: 'center', justifyContent: 'center', display: 'flex'
                            }} {...getRootProps()}>

                                <input {...getInputProps()} />

                                <Icon type="plus" style={{ fontSize: '3rem' }} />

                            </div>
                        )}
                    </Dropzone>

                    {/*Thumbnail */}

                    {ThumbnailPath &&
                        <div>
                            <img src={`http://localhost:5000/${ThumbnailPath}`} alt="thumbnail" />
                        </div>
                    }
                </div>



                <br /><br /><br />
                <label>제목</label>
                <Input onChange={onTitleChange}
                    value={VideoTitle}
                />


                <br /><br /><br />
                <label>내용</label>
                <TextArea
                    onChange={onDescriptionChange}
                    value={Description}
                />

                <br /><br /><br />


                <Select onChange={onPrivateChange} style={{ width: 120 }} >
                    {PrivateOptions.map((item, index) => (
                        <Option key={index} value={item.value}>{item.label}</Option>
                    ))}
                </Select>

                <br /><br /><br />
                <Select onChange={onCategoryChange} style={{ width: 120 }}   >
                    {CateogryOptions.map((item, index) => (
                        <Option key={index} value={item.value}  >{item.label}</Option>
                    ))}
                </Select>

                <br /><br /><br />
                <Button size='large' type='primary' onClick={onSubmit}>
                    전송
                </Button>



            </Form>



        </div >

    )
};


export default VideoUploadPage;