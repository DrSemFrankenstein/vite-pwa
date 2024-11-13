import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteDataThunk,
  fetchDataThunk,
  postDataThunk,
  putDataThunk,
} from "../Redux/apiThunks";
import { Button, Row, Col, List } from "antd";
import GenericCard from "./LaunchCard";

const ExampleApiRequests = () => {
  const dispatch = useDispatch();
  const apiState = useSelector((state) => state.api);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const existingData = apiState.data;
  const hasDataForCurrentPage = existingData && existingData[page]; // Assuming data is organized by pages

  //pull from last saved data in redux
  useEffect(() => {
    if (!hasDataForCurrentPage) {
      dispatch(fetchDataThunk("/launches", page));
    }
  }, [dispatch, page, hasDataForCurrentPage]);

  //pull from server
  // useEffect(() => {
  //   dispatch(fetchDataThunk("/launches", page));
  // }, [dispatch, page]);

  const handlePostData = () => {
    const payload = { key: "value" };
    dispatch(postDataThunk("/my-endpoint", payload));
  };

  const handlePutData = () => {
    const payload = { key: "newValue" };
    dispatch(putDataThunk("/my-endpoint", payload));
  };

  const handleDeleteData = () => {
    dispatch(deleteDataThunk("/my-endpoint"));
  };

  const loadMore = () => {
    if (!loading && apiState.data && apiState.data.length > 0) {
      setLoading(true);
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
    if (bottom) {
      loadMore();
    }
  };

  return (
    <div className="api-request-container override-justify">
      {apiState.loading && <p>Loading...</p>}
      {apiState.error && <p>Error: {apiState.error}</p>}

      <Row gutter={[16, 16]} className="card-container">
        <Col span={24}>
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 3,
              lg: 4,
              xl: 5,
            }}
            loading={loading}
            dataSource={apiState.data || []} // Use an empty array as a fallback
            renderItem={(data, index) => (
              <List.Item key={index} className="card-item">
                <GenericCard
                  data={data}
                  mediaKey="links.youtube_id"
                  avatarKey="links.mission_patch"
                  titleKey="mission_name"
                  subtitleKeys={[
                    "launch_date_local",
                    "rocket.rocket_name",
                    "rocket.second_stage.payloads.0.payload_id",
                  ]}
                />
              </List.Item>
            )}
            onScroll={handleScroll}
          />
        </Col>
      </Row>

      <div className="api-actions">
        <Button onClick={handlePostData}>Send POST Request</Button>
        <Button onClick={handlePutData}>Send PUT Request</Button>
        <Button onClick={handleDeleteData}>Send DELETE Request</Button>
      </div>
    </div>
  );
};

export default ExampleApiRequests;
