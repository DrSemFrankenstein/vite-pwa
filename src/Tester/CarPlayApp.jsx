import React from "react";
import { Col, Layout, Row } from "antd";
import CurrentTime from "../Components/CurrentTime";
import CurrentDate from "../Components/CurrentDate";
import BluetoothConnection from "../Components/BluetoothConnection";
import IFrameBuilder from "../Components/IFrameBuilder";

const { Content } = Layout;

const CarPlayApp = () => {
  return (
    <Content style={{ textAlign: "center" }}>
      <br />
      <Row gutter={[16, 16]} justify="center">
        <Col xs={24} sm={24} md={21} lg={21} xl={21}>
          <CurrentTime />
          <CurrentDate />
        </Col>
        <Col xs={24} sm={12} md={1} lg={1} xl={1}>
          <BluetoothConnection />
        </Col>
      </Row>
      <br />
      <IFrameBuilder />
    </Content>
  );
};

export default CarPlayApp;
