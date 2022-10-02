import { ChatBox } from '@orbisclub/modules'
import "@orbisclub/modules/dist/index.modern.css";

export default function OrbisChat() {
    /** The context parameter in the <ChatBox/> object must be your group or channel id or a custom string */
    return(
        <ChatBox context="kjzl6cwe1jw147835qalnr8c0u0zpnxr80xo6z2snjb6yzth3ki5llykvsdu6j6" poweredByOrbis="black" />
    );
}

// channel id: kjzl6cwe1jw147835qalnr8c0u0zpnxr80xo6z2snjb6yzth3ki5llykvsdu6j6