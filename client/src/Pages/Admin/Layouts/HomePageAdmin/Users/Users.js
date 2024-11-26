import { useEffect, useState } from 'react';
import './User.scss';
import request from '../../../../../config/config';
import { ModalEditUser, ModalEditUserActive } from '../../../Modal/Modal';

function Customers() {
    const [dataUser, setDataUser] = useState([]);
    const [show, setShow] = useState(false);
    const [showActive, setShowActive] = useState(false);
    const [email, setEmail] = useState('');

    useEffect(() => {
        request.get('/api/getlistusers').then((res) => setDataUser(res.data));
    }, [show, showActive]);

    const handleShowModal = (emailUser) => {
        setShow(!show);
        setEmail(emailUser);
    };
    const handleShowModalActive = (emailUser) => {
        setShowActive(!showActive);
        setEmail(emailUser);
    };
    return (
        <div>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Full Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Vai trò</th>
                        <th scope="col">Cập nhật</th>
                        <th scope="col">Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    {dataUser.map((item) => (
                        <>
                            <tr key={item._id}>
                                <th scope="row">{item._id}</th>
                                <td>{`${item.firstName} ${item.lastName}`}</td>
                                <td>{item.email}</td>
                                <td>{item.isAdmin ? 'Quản trị viên' : item.isPublisher ? 'Nhà xuất bản' : item.isDeveloper ? 'Nhà phát triển' : 'Người chơi'}</td>
                                <td>
                                    <button
                                        onClick={() => handleShowModal(item.email)}
                                        type="button"
                                        className="status-button edit"
                                    >
                                        Chỉnh Sửa
                                    </button>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleShowModalActive(item.email)}
                                        type="button"
                                        className={`status-button ${item.isactive ? 'active' : 'inactive'}`}
                                    >
                                        {item.isactive ? 'Hoạt động' : 'Vô hiệu hóa'}
                                    </button>
                                </td>
                            </tr>
                        </>
                    ))}
                </tbody>
            </table>
            <ModalEditUser show={show} setShow={setShow} email={email} />
            <ModalEditUserActive showActive={showActive} setShowActive={setShowActive} email={email} />
        </div>
    );
}

export default Customers;
