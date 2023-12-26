import '../../css/homepage.css'
import { Text, Image, Flex } from '@chakra-ui/react'
import {
    javascriptIcon,
    reactIcon,
    viteIcon,
    tailwindcssIcon,
    nodejsIcon,
    expressIcon,
    reduxIcon,
    reactRouterIcon,
    mondodbIcon,
} from '../../assets/icons'

function TechSection() {
    return (
        <Flex direction={'column'}>
            <Text color={'white'} className="title text-pop-up-top" mt={80}>
                Trellux
            </Text>

            <Flex m={'auto'} gap={3} alignItems={'center'} flexWrap={'wrap'}>
                <Image src={javascriptIcon} alt="js logo" width={10} />
                <Image src={reactIcon} alt="react logo" width={10} />
                <Image src={viteIcon} alt="vite logo" width={10} />
                <Image src={tailwindcssIcon} alt="tail logo" width={10} />
                <Image src={nodejsIcon} alt="node logo" width={10} />
                <Image src={expressIcon} alt="express logo" width={20} />
                <Image src={reduxIcon} alt="redux logo" width={10} />
                <Image
                    src={reactRouterIcon}
                    alt="react router logo"
                    width={10}
                />
                <Image src={mondodbIcon} alt="mongo logo" width={10} />
            </Flex>
        </Flex>
    )
}

export default TechSection
