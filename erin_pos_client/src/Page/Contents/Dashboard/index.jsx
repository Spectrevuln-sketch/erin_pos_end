import React from 'react'
import { Tables } from './../../Components';

const Dashboard = () => {





    return (
        <>
            <div className="row">
                <div className="col">
                    <div className="card card-chart">
                        <div className="card-header">
                            <h5 className="card-category">Global Sales</h5>
                            <h4 className="card-title">Shipped Products</h4>
                            <div className="dropdown">
                                <button
                                    type="button"
                                    className="btn btn-round btn-outline-default dropdown-toggle btn-simple btn-icon no-caret"
                                    data-toggle="dropdown"
                                >
                                    <i className="now-ui-icons loader_gear" />
                                </button>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <a className="dropdown-item" href="#">
                                        Action
                                    </a>
                                    <a className="dropdown-item" href="#">
                                        Another action
                                    </a>
                                    <a className="dropdown-item" href="#">
                                        Something else here
                                    </a>
                                    <a className="dropdown-item text-danger" href="#">
                                        Remove Data
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="chart-area">
                                <canvas id="lineChartExample" />
                            </div>
                        </div>
                        <div className="card-footer">
                            <div className="stats">
                                <i className="now-ui-icons arrows-1_refresh-69" /> Just
                                Updated
                            </div>
                        </div>
                    </div>
                </div>
                {/* End Header */}
                <div className="col">
                    <div className="card card-chart">
                        <div className="card-header">
                            <h5 className="card-category">2021 Sales</h5>
                            <h4 className="card-title">All products</h4>
                            <div className="dropdown">
                                <button
                                    type="button"
                                    className="btn btn-round btn-outline-default dropdown-toggle btn-simple btn-icon no-caret"
                                    data-toggle="dropdown"
                                >
                                    <i className="now-ui-icons loader_gear" />
                                </button>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <a className="dropdown-item" href="#">
                                        Action
                                    </a>
                                    <a className="dropdown-item" href="#">
                                        Another action
                                    </a>
                                    <a className="dropdown-item" href="#">
                                        Something else here
                                    </a>
                                    <a className="dropdown-item text-danger" href="#">
                                        Remove Data
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="chart-area">
                                <canvas id="lineChartExampleWithNumbersAndGrid" />
                            </div>
                        </div>
                        <div className="card-footer">
                            <div className="stats">
                                <i className="now-ui-icons arrows-1_refresh-69" /> Just
                                Updated
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
