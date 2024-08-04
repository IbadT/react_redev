import { Flex, Spin } from 'antd';


export const Loading = () => {
    return (
        <Flex vertical align='center' justify='center' style={{ width: "100vw", height: "100vh"}}>
            <Spin size="large" fullscreen />
        </Flex>
    )
}