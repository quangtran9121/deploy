import classNames from 'classnames/bind';
import styles from './DashBoard.module.scss';
import { useEffect, useState } from 'react';

import request from '../../../../../config/config';

const cx = classNames.bind(styles);

function Dashboard() {
    const [dataUser, setDataUser] = useState({});

    useEffect(() => {
        request.get('/api/getuserdetail').then((res) => setDataUser(res.data));
    }, []);

    return (
        <div className={cx('wrapper')}>
            <header className={cx('header-page-admin')}>
                <div className={cx('img-admin')}>
                    <img
                        src={`http://45.77.32.24:5000/uploads/${dataUser.dataUser?.avatar}`}
                        loading="lazy"
                        alt=""
                    />
                </div>

                <div className={cx('info-admin')}>
                    <h1>{dataUser?.dataUser?.fullname}</h1>
                    <div className={cx('position')}>
                        <span>{dataUser?.dataUser?.email}</span>
                        <span>{dataUser?.dataUser?.isAdmin ? 'Quản trị viên' : ''}</span>
                        <span>{dataUser?.dataUser?.isPublisher ? 'Nhà xuất bản' : ''}</span>
                        <span>{dataUser?.dataUser?.isDeveloper ? 'Nhà phát triển' : ''}</span>
                    </div>
                </div>
            </header>

            <main className={cx('info-account')}>
                <header>
                    <h1>Thông Tin</h1>
                </header>

                <div className={cx('input-info')}>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                            Họ Và Tên
                        </span>
                        <input value={`${dataUser.dataUser?.firstName || ''} ${dataUser.dataUser?.lastName || ''}`} type="text" className="form-control" readOnly />
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                            Email
                        </span>
                        <input value={dataUser.dataUser?.email} type="text" className="form-control" />
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                            Mật Khẩu
                        </span>
                        <input value={dataUser.dataUser?.password} type="password" className="form-control" />
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                            Chức Vụ
                        </span>
                        <input value={dataUser.dataUser?.isAdmin ? 'Admin' : ''} type="text" className="form-control" />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;
