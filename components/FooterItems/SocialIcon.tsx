import Link from 'next/link'
import * as Icons from 'react-icons/fa'

export const SocialIcon = (props: any) => {
    const Icon = Icons[props.icon]?Icons[props.icon]:Icons.FaQuestion
    return(
        <Link href={props.url} className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
            <Icon className="h-5 w-5" />
            <span className="sr-only">{props.platform} account</span>
        </Link>
    )
}