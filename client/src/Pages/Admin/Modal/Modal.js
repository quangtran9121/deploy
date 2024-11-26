import classNames from 'classnames/bind';
import styles from './Modal.module.scss';

import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import request from '../../../config/config';
import { toast, ToastContainer } from 'react-toastify';

const cx = classNames.bind(styles);

export function ModalAddGame({ show, setShow }) {
    const handleClose = () => setShow(false);

    const [game_name, setNameGame] = useState('');
    const [developer, setDeveloper] = useState('');
    const [description, setDescription] = useState('');
    const [fileImg, setFileImg] = useState('');
    const [title, setTitle] = useState('');
    const [tag, setTag] = useState('');
    const [genres, setGenres] = useState('');
    const [url, setUrl] = useState('');
    const [play_count, setPlaycount] = useState(0);
    const [languages, setLanguages] = useState('');
    const [player, setPlayer] = useState('');
    const [expectedTraffic, setExpectedTraffic] = useState('');
    const [mobile_compatible, setMobile] = useState('');
    const [countries, setCountries] = useState([]);
    // const [tag, setTag] = useState

    //List of countries from external API
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch('https://restcountries.com/v3.1/all');
                const data = await response.json();
                const countryNames = data.map((country) => country.name.common).sort();
                setCountries(countryNames);
            } catch (error) {
                console.error('Error fetching countries:', error);
                toast.error('Failed to load country data');
            }
        };
        fetchCountries();
    }, []);


    const handleAddGame = async () => {
        // event.preventDefault();

        const formData = new FormData();
        formData.append('img', fileImg);

        // const checkProduct = selectedCheckbox || (checkOption === '1' ? 'fashionMen' : 'fashionWomen');

        try {
            if (!game_name || !developer || !description || !title || !fileImg || !url || !languages || !player || !genres ) {
                toast.error('Vui lòng điền đầy đủ thông tin !!!');
                return;
            }

            formData.append('game_name', game_name);
            formData.append('developer', developer);
            formData.append('description', description);
            formData.append('title', title);
            formData.append('url', url);
            formData.append('languages', languages);
            formData.append('player', player);
            formData.append('mobile_compatible', mobile_compatible);
            formData.append('expectedTraffic', expectedTraffic);
            formData.append('tag', tag);
            formData.append('genres', genres);

            // Retrieve the token from cookies
            const token = document.cookie; 
            formData.append('token', token);

            const res = await request.post('/api/addgame', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });


            toast.success(res.data.message);
            setShow(true);
            // await request.post('/api/game');
        } catch (error) {
            toast.error('Có lỗi xảy ra!');
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} dialogClassName="modal-custom-width">
                <ToastContainer />
                <Modal.Header closeButton>
                    <Modal.Title>Thêm Game</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="input-group mb-3 style={{ height: '150px', width: '467px'}}">
                        <span className="input-group-text" id="basic-addon1">
                            Tên Game
                        </span>
                        <input type="text" className="form-control" onChange={(e) => setNameGame(e.target.value)} />
                    </div>

                    <div>
                        <div className="mb-3">
                            <label htmlFor="formFile" className="form-label">
                                Chọn Avatar Game
                            </label>
                            <input
                                className="form-control"
                                type="file"
                                id="formFile"
                                onChange={(e) => setFileImg(e.target.files[0])}
                            />
                        </div>
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                            Url
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) => setUrl(e.target.value)}
                        />
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                            Developer
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) => setDeveloper(e.target.value)}
                        />
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                            Title
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                            Tag
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) => setTag(e.target.value)}
                        />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                            Genres
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) => setGenres(e.target.value)}
                        />
                    </div>
                    <div>

                        <select
                            value={languages}
                            onChange={(e) => setLanguages(e.target.value)}
                            className="form-select mt-3"
                            aria-label="Chọn ngôn ngữ"
                        >
                            <option value="">Languages</option>
                            {countries.map((country, index) => (
                                <option key={index} value={country}>{country}</option>
                            ))}
                        </select>
                        
                    </div>
                    <div>
                        <select
                            value={player}
                            onChange={(e) => setPlayer(e.target.value)}
                            className="form-select mt-3"
                            aria-label="Default select example"
                        >
                            <option value="">Players</option>
                            <option value="single-player">Single-Player</option>
                            <option value="multi-players">Multiplayers</option>
                            <option value="co-op">Co-op</option>
                        </select>
                        
                    </div>
                    <div>
                        <select
                            value={mobile_compatible}
                            onChange={(e) => setMobile(e.target.value)}
                            className="form-select mt-3"
                            style={{marginBottom: "10px"}}
                            aria-label="Default select example"
                        >
                            <option value="">Mobile Compatible</option>
                            <option value="Desktop Only">Desktop Only</option>
                            <option value="For Android">For Android</option>
                            <option value="For IOS">For IOS</option>
                            <option value="For Both">For Both</option>
                        </select>
                        
                    </div>
                    

                    <div className="input-group mb-3">
                        <div className="game-description">Mô tả Game:</div>
                        <div className="form-floating">
                            <textarea
                                className="form-control"
                                placeholder="Leave a comment here"
                                id="floatingTextarea2"
                                style={{ height: '150px', width: '427px'}}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                            {/* <label htmlFor="floatingTextarea2">Mô Tả Game</label> */}
                        </div>
                    </div>

                    <div>
                        <div className="form-floating mt-3">
                            <input
                                value={expectedTraffic}
                                onChange={(e) => setExpectedTraffic(e.target.value)}
                                type="text"
                                className="form-control"
                                id="floatingInput"
                                list="trafficOptions" // Kết nối input với datalist
                            />
                            <label htmlFor="floatingInput">Expected Traffic</label>

                            {/* Datalist để tạo danh sách gợi ý */}
                            <datalist id="trafficOptions">
                                <option value="<50K visits per month" />
                                <option value="50K - 100K visits per month" />
                                <option value="100K - 500K visits per month" />
                                <option value="500K - 1M visits per month" />
                                <option value="1M - 10M visits per month" />
                            </datalist>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" type="button" onClick={handleAddGame}>
                        Thêm Game
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export function ModalDeleteGame({ showModalDelete, setShowModalDelete, game_id }) {
    const handleClose = () => setShowModalDelete(false);
    const handleDeleteGame = async () => {
        try {
            const res = await request.delete(`/api/deletegame/${game_id}`);
            toast.success(res.data.message);
        } catch (error) {
            toast.error("Failed to delete game");
        }
    };
    

    return (
        <div>
            <Modal show={showModalDelete} onHide={handleClose}>
                <ToastContainer />
                <Modal.Header closeButton>
                    <Modal.Title>Xóa Sản Phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có muốn xóa game có id: {game_id}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={handleDeleteGame}>
                        Xóa
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export function ModalEditGame({ setShowModalEdit, showModalEdit, game_id }) {
    const handleClose = () => setShowModalEdit(false);
    
    const [game_name, setNameGame] = useState('');
    const [developer, setDeveloper] = useState('');
    const [description, setDescription] = useState('');
    const [img, setImg] = useState('');
    const [title, setTitle] = useState('');
    const [tag, setTag] = useState('');
    const [genres, setGenres] = useState('');
    const [url, setUrl] = useState('');
    const [play_count, setPlaycount] = useState(0);
    const [languages, setLanguages] = useState('');
    const [player, setPlayer] = useState('');
    const [expectedTraffic, setExpectedTraffic] = useState('');
    const [mobile_compatible, setMobile] = useState('');
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        if (showModalEdit) {
            const fetchData = async () => {
                try {
                    const res = await request.get(`/api/gamedetailid`, {
                        params: { id: game_id } // Chỉ cần truyền params
                    });
                    // console.log(game_id)
                    
                    const data = res.data;
                    setNameGame(data.game_name);
                    setDeveloper(data.developer);
                    setDescription(data.description);
                    setTitle(data.title);
                    setUrl(data.url);
                    setImg(data.img);
                    setLanguages(data.languages);
                    setPlayer(data.players);
                    setExpectedTraffic(data.expectedTraffic);
                    setGenres(data.genres);
                    setTag(data.tag);
                    setMobile(data.mobile_compatible);
                } catch (error) {
                    toast.error('Lỗi khi tải dữ liệu game');
                }
            };
            fetchData();
            // Fetch countries for language options
            const fetchCountries = async () => {
                try {
                    const response = await fetch('https://restcountries.com/v3.1/all');
                    const countryData = await response.json();
                    const languageSet = new Set();
                    countryData.forEach((country) => {
                        if (country.languages) {
                            Object.values(country.languages).forEach((lang) => {
                                languageSet.add(lang);
                            });
                        }
                    });
                    setCountries([...languageSet].sort());
                } catch (error) {
                    toast.error('Failed to load country data');
                }
            };
            fetchCountries();
        }
    }, [showModalEdit, game_id]);

    // const handleCheckboxChange = (checkboxName) => {
    //     if (selectedCheckbox === checkboxName) {
    //         setSelectedCheckbox('');
    //     } else {
    //         setSelectedCheckbox(checkboxName);
    //     }
    // };

    const handleEditGame = async () => {

        const formData = new FormData();
        formData.append('img', img);
        formData.append('game_name', game_name);
        formData.append('developer', developer);
        formData.append('description', description);
        formData.append('title', title);
        formData.append('url', url);
        formData.append('languages', languages);
        formData.append('players', player);
        formData.append('mobile_compatible', mobile_compatible);
        formData.append('expectedTraffic', expectedTraffic);
        formData.append('game_id', game_id);
        formData.append('tag', tag);
        formData.append('genres', genres);
        console.log(game_id);
        try {
            const res = await request.patch('/api/updategame', formData);
            toast.success(res.data.message);
            setShowModalEdit(true);
        } catch (error) {
            toast.error('Lỗi khi chỉnh sửa Game');
        }
    };

    return (
        <div>
            <Modal show={showModalEdit} onHide={handleClose}>
                <ToastContainer />
                <Modal.Header closeButton>
                    <Modal.Title>Sửa Game</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                            Tên Game
                        </span>
                        <input type="text" value={game_name} className="form-control" onChange={(e) => setNameGame(e.target.value)} />
                    </div>

                    <div>
                        <div className="mb-3">
                            <label htmlFor="formFile" className="form-label">
                                Chọn Avatar Game
                            </label>
                            <input
                                className="form-control"
                                type="file"
                                id="formFile"
                                onChange={(e) => setImg(e.target.files[0])}
                            />
                        </div>
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                            Url
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                            Developer
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            value={developer}
                            onChange={(e) => setDeveloper(e.target.value)}
                        />
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                            Title
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                            Tag
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            value={tag}
                            onChange={(e) => setTag(e.target.value)}
                        />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                            Genres
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            value={genres}
                            onChange={(e) => setGenres(e.target.value)}
                        />
                    </div>
                    <div>
                        <select
                            value={languages}
                            onChange={(e) => setLanguages(e.target.value)}
                            className="form-select mt-3"
                            aria-label="Default select example"
                        >
                            <option value="">Select Language</option>
                            {countries.map((lang, index) => (
                                <option key={index} value={lang}>{lang}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <select
                            value={player}
                            onChange={(e) => setPlayer(e.target.value)}
                            className="form-select mt-3"
                            aria-label="Default select example"
                        >
                            <option value="">Players</option>
                            <option value="single-player">Single-Player</option>
                            <option value="multi-players">Multiplayers</option>
                            <option value="co-op">Co-op</option>
                        </select>
                        
                    </div>
                    <div>
                        <select
                            value={mobile_compatible}
                            onChange={(e) => setMobile(e.target.value)}
                            className="form-select mt-3"
                            style={{marginBottom: "10px"}}
                            aria-label="Default select example"
                        >
                            <option value="">Mobile Compatible</option>
                            <option value="Desktop Only">Desktop Only</option>
                            <option value="For Android">For Android</option>
                            <option value="For IOS">For IOS</option>
                            <option value="For Both">For Both</option>
                        </select>
                        
                    </div>
                    

                    <div className="input-group mb-3">
                        <div className="game-description">Mô tả Game:</div>
                        <div className="form-floating">
                            <textarea
                                className="form-control"
                                placeholder="Leave a comment here"
                                id="floatingTextarea2"
                                style={{ height: '150px', width: '427px'}}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                            {/* <label htmlFor="floatingTextarea2">Mô Tả Game</label> */}
                        </div>
                    </div>

                    <div>
                        <div className="form-floating mt-3">
                            <input
                                value={expectedTraffic}
                                onChange={(e) => setExpectedTraffic(e.target.value)}
                                type="text"
                                className="form-control"
                                id="floatingInput"
                                list="trafficOptions" // Kết nối input với datalist
                            />
                            <label htmlFor="floatingInput">Expected Traffic</label>

                            {/* Datalist để tạo danh sách gợi ý */}
                            <datalist id="trafficOptions">
                                <option value="<50K visits per month" />
                                <option value="50K - 100K visits per month" />
                                <option value="100K - 500K visits per month" />
                                <option value="500K - 1M visits per month" />
                                <option value="1M - 10M visits per month" />
                            </datalist>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={handleEditGame}>
                        Lưu Lại
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}







export function ModalEditUser({ show, setShow, email }) {
    const [valueSelect, setValueSelect] = useState('0');

    const handleEditUser = async () => {
        try {
            const res = await request.post('/api/userauthorization', { valueSelect, email });
            toast.success(res.data.message);
        } catch (error) {
            console.log(error);
        }
    };

    const handleClose = () => setShow(false);

    return (
        <Modal show={show} onHide={handleClose}>
            <ToastContainer />
            <Modal.Header closeButton>
                <Modal.Title>Cập Nhật Vai Trò </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <select
                    onChange={(e) => setValueSelect(e.target.value)}
                    className="form-select"
                    aria-label="Default select example"
                >
                    <option selected>Chọn quyền</option>
                    <option value="1">Quản trị viên</option>
                    <option value="2">Nhà phát triển</option>
                    <option value="3">Nhà xuất bản</option>
                    <option value="4">Người chơi</option>
                </select>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
                <Button variant="primary" onClick={handleEditUser}>
                    Lưu Lại
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export function ModalEditUserActive({ showActive, setShowActive, email }) {
    const [valueSelect, setValueSelect] = useState('0');

    const handleEditUserActive = async () => {
        try {
            const res = await request.post('/api/authorization', { valueSelect, email });
            toast.success(res.data.message);
        } catch (error) {
            console.log(error);
        }
    };

    const handleClose = () => setShowActive(false);

    return (
        <Modal show={showActive} onHide={handleClose}>
            <ToastContainer />
            <Modal.Header closeButton>
                <Modal.Title>Cập nhật trạng thái tài khoản </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <select
                    onChange={(e) => setValueSelect(e.target.value)}
                    className="form-select"
                    aria-label="Default select example"
                >
                    <option selected>Chọn trạng thái</option>
                    <option value="1">Hoạt động</option>
                    <option value="2">Vô hiệu hóa</option>
                </select>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
                <Button variant="primary" onClick={handleEditUserActive}>
                    Lưu Lại
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

