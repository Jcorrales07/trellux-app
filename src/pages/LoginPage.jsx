import LoginForm from "../components/login/LoginForm.jsx";
import {Flex} from "@chakra-ui/react";
import {LoginHeader} from "../components/FormHeaders.jsx";

function LoginPage() {
    return (
        <Flex flexDirection={'column'} minHeight={'100vh'} gap={5}>
            <LoginHeader/>
            <LoginForm/>
        </Flex>
    );
}

export default LoginPage;