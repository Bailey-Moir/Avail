/**
 * The types used for logs. 
 * @author Bailey Moir <bailey.p.moir@gmail.com>
 */

/**
 * The enum tha tis used to differentiate the types of logs.
 */
export enum LogType {
    /**
     * A delete log.
     */
    DELETE,
    /**
     * A delete bulk log.
     */
    DELETE_BULK,
    /**
     * A edit log.
     */
    EDIT
}

/**
 * The type of a delete log.
 */
type deleteLog = {
    /**
     * Allows you to differentiate between log types.
     */
    type: LogType.DELETE,
    /**
     * When the action that generated the log occured.
     */
    acted: Date,
    /**
     * The content of the deleted message.
     */
    content: string,
    /**
     * The name of the author of the deleted message.
     */
    authorName: string,
    /**
     * The URL of the icon of the author of the deleted mesasge.
     */
    authorIcon: string,
    /**
     * When the deleted message was sent.
     */
    sent: number,
    /**
     * The ID/Snowflake of the channel the deleted message was sent in.
     */
    channelID: string,
    /**
     * The ID/Snowflake of the author of the deleted message.
     */
    authorID: string
}

/**
 * The type of a delete bulk log.
 */
type deleteBulkLog = {
    /**
     * Allows you to differentiate between log types.
     */
    type: LogType.DELETE_BULK,
    /**
     * When the action that generated the log occured.
     */
    acted: Date,
    /**
     * The ID/Snowflake of the channel the deleted message was sent in.
     */
    channelID: string,
    /**
     * The array of messages that were deleted.
     */
    messages: {
        /**
         * The content of the deleted message.
         */
        content: string,
        /**
         * The name of the author of the deleted message.
         */
        authorName: string,
        /**
         * The URL of the icon of the author of the deleted mesasge.
         */
        authorIcon: string,
        /**
         * When the deleted message was sent.
         */
        sent: number,
        /**
         * The ID/Snowflake of the author of the deleted message.
         */
        authorID: string
    }[]
}

/**
 * The type of a edit/update message log.
 */
type updateLog = {
    /**
     * Allows you to differentiate between log types.
     */
    type: LogType.EDIT,
    /**
     * When the action that generated the log occured.
     */
    acted: Date,
    /**
     * The content of the message before being edited.
     */
    oldContent: string,
    /**
     * The content of the message after being edited.
     */
    newContent: string,
    /**
     * The name of the author of the deleted message.
     */
    authorName: string,
    /**
     * The URL of the icon of the author of the deleted mesasge.
     */
    authorIcon: string,
    /**
     * The ID/Snowflake of the channel the deleted message was sent in.
     */
    channelID: string,
    /**
     * The ID/Snowflake of the author of the deleted message.
     */
    authorID: string
}

/**
 * The general type for all logs.
 */
export type log = deleteLog | deleteBulkLog | updateLog;