import { Flex } from 'antd';
import { MehOutlined } from "@ant-design/icons"

export const ErrorPage = () => {
    return (
        <Flex gap={20} vertical justify='center' align='center' style={{ color: "white", height: "100vh", width: "100vw", fontSize: "10vmin"}}>
            <Flex>ErrorPage</Flex>
            <Flex><MehOutlined /></Flex>
        </Flex>
    )
}