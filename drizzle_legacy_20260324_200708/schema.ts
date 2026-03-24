import { pgSchema, pgTable, bigint, text, integer, timestamp, uuid, customType, jsonb, boolean, numeric, varchar, doublePrecision, interval, primaryKey, unique } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const crdbInternal = pgSchema("crdb_internal");
export const pgExtension = pgSchema("pg_extension");


export const activeRangeFeedsInCrdbInternal = crdbInternal.table("active_range_feeds", {
	id: bigint({ mode: 'number' }),
	tags: text(),
	startAfter: numeric("start_after"),
	diff: boolean(),
	nodeId: bigint("node_id", { mode: 'number' }),
	rangeId: bigint("range_id", { mode: 'number' }),
	created: timestamp({ withTimezone: true }),
	rangeStart: text("range_start"),
	rangeEnd: text("range_end"),
	resolved: numeric(),
	resolvedAge: interval("resolved_age"),
	lastEvent: timestamp("last_event", { withTimezone: true }),
	catchup: boolean(),
	numErrs: bigint("num_errs", { mode: 'number' }),
	lastErr: text("last_err"),
});

export const backwardDependenciesInCrdbInternal = crdbInternal.table("backward_dependencies", {
	descriptorId: bigint("descriptor_id", { mode: 'number' }),
	descriptorName: text("descriptor_name").notNull(),
	indexId: bigint("index_id", { mode: 'number' }),
	columnId: bigint("column_id", { mode: 'number' }),
	dependsonId: bigint("dependson_id", { mode: 'number' }).notNull(),
	dependsonType: text("dependson_type").notNull(),
	dependsonIndexId: bigint("dependson_index_id", { mode: 'number' }),
	dependsonName: text("dependson_name"),
	dependsonDetails: text("dependson_details"),
});

export const builtinFunctionsInCrdbInternal = crdbInternal.table("builtin_functions", {
	function: text().notNull(),
	signature: text().notNull(),
	category: text().notNull(),
	details: text().notNull(),
	schema: text().notNull(),
	oid: customType({ dataType: () => 'oid' })().notNull(),
});

export const clusterContentionEventsInCrdbInternal = crdbInternal.table("cluster_contention_events", {
	tableId: bigint("table_id", { mode: 'number' }),
	indexId: bigint("index_id", { mode: 'number' }),
	numContentionEvents: bigint("num_contention_events", { mode: 'number' }).notNull(),
	cumulativeContentionTime: interval("cumulative_contention_time").notNull(),
	key: customType({ dataType: () => 'bytea' })().notNull(),
	txnId: uuid("txn_id").notNull(),
	count: bigint({ mode: 'number' }).notNull(),
});

export const clusterDatabasePrivilegesInCrdbInternal = crdbInternal.table("cluster_database_privileges", {
	databaseName: text("database_name").notNull(),
	grantee: text().notNull(),
	privilegeType: text("privilege_type").notNull(),
	isGrantable: text("is_grantable"),
});

export const clusterDistsqlFlowsInCrdbInternal = crdbInternal.table("cluster_distsql_flows", {
	flowId: uuid("flow_id").notNull(),
	nodeId: bigint("node_id", { mode: 'number' }).notNull(),
	stmt: text(),
	since: timestamp({ withTimezone: true }).notNull(),
});

export const clusterExecutionInsightsInCrdbInternal = crdbInternal.table("cluster_execution_insights", {
	sessionId: text("session_id").notNull(),
	txnId: uuid("txn_id").notNull(),
	txnFingerprintId: customType({ dataType: () => 'bytea' })("txn_fingerprint_id").notNull(),
	stmtId: text("stmt_id").notNull(),
	stmtFingerprintId: customType({ dataType: () => 'bytea' })("stmt_fingerprint_id").notNull(),
	problem: text().notNull(),
	causes: text().array().notNull(),
	query: text().notNull(),
	status: text().notNull(),
	startTime: timestamp("start_time").notNull(),
	endTime: timestamp("end_time").notNull(),
	fullScan: boolean("full_scan").notNull(),
	userName: text("user_name").notNull(),
	appName: text("app_name").notNull(),
	databaseName: text("database_name").notNull(),
	planGist: text("plan_gist").notNull(),
	rowsRead: bigint("rows_read", { mode: 'number' }).notNull(),
	rowsWritten: bigint("rows_written", { mode: 'number' }).notNull(),
	priority: text().notNull(),
	retries: bigint({ mode: 'number' }).notNull(),
	lastRetryReason: text("last_retry_reason"),
	execNodeIds: bigint("exec_node_ids", { mode: 'number' }).array().notNull(),
	kvNodeIds: bigint("kv_node_ids", { mode: 'number' }).array().notNull(),
	contention: interval(),
	indexRecommendations: text("index_recommendations").array().notNull(),
	implicitTxn: boolean("implicit_txn").notNull(),
	cpuSqlNanos: bigint("cpu_sql_nanos", { mode: 'number' }),
	errorCode: text("error_code"),
	lastErrorRedactable: text("last_error_redactable"),
	queryTags: jsonb("query_tags"),
});

export const clusterInflightTracesInCrdbInternal = crdbInternal.table("cluster_inflight_traces", {
	traceId: bigint("trace_id", { mode: 'number' }).notNull(),
	nodeId: bigint("node_id", { mode: 'number' }).notNull(),
	rootOpName: text("root_op_name").notNull(),
	traceStr: text("trace_str"),
	jaegerJson: text("jaeger_json"),
});

export const clusterLocksInCrdbInternal = crdbInternal.table("cluster_locks", {
	rangeId: bigint("range_id", { mode: 'number' }).notNull(),
	tableId: bigint("table_id", { mode: 'number' }).notNull(),
	databaseName: text("database_name").notNull(),
	schemaName: text("schema_name").notNull(),
	tableName: text("table_name").notNull(),
	indexName: text("index_name"),
	lockKey: customType({ dataType: () => 'bytea' })("lock_key").notNull(),
	lockKeyPretty: text("lock_key_pretty").notNull(),
	txnId: uuid("txn_id"),
	ts: timestamp(),
	lockStrength: text("lock_strength"),
	durability: text(),
	granted: boolean(),
	contended: boolean().notNull(),
	duration: interval(),
	isolationLevel: text("isolation_level"),
});

export const clusterQueriesInCrdbInternal = crdbInternal.table("cluster_queries", {
	queryId: text("query_id"),
	txnId: uuid("txn_id"),
	nodeId: bigint("node_id", { mode: 'number' }).notNull(),
	sessionId: text("session_id"),
	userName: text("user_name"),
	start: timestamp({ withTimezone: true }),
	query: text(),
	clientAddress: text("client_address"),
	applicationName: text("application_name"),
	distributed: boolean(),
	phase: text(),
	fullScan: boolean("full_scan"),
	planGist: text("plan_gist"),
	database: text(),
	isolationLevel: text("isolation_level"),
	numTxnRetries: bigint("num_txn_retries", { mode: 'number' }),
	numTxnAutoRetries: bigint("num_txn_auto_retries", { mode: 'number' }),
});

export const clusterReplicationNodeStreamCheckpointsInCrdbInternal = crdbInternal.table("cluster_replication_node_stream_checkpoints", {
	streamId: bigint("stream_id", { mode: 'number' }),
	consumer: text(),
	spanStart: text("span_start"),
	spanEnd: text("span_end"),
	resolved: numeric(),
	resolvedAge: interval("resolved_age"),
});

export const clusterReplicationNodeStreamSpansInCrdbInternal = crdbInternal.table("cluster_replication_node_stream_spans", {
	streamId: bigint("stream_id", { mode: 'number' }),
	consumer: text(),
	spanStart: text("span_start"),
	spanEnd: text("span_end"),
});

export const clusterReplicationNodeStreamsInCrdbInternal = crdbInternal.table("cluster_replication_node_streams", {
	streamId: bigint("stream_id", { mode: 'number' }),
	consumer: text(),
	spans: bigint({ mode: 'number' }),
	initialTs: numeric("initial_ts"),
	prevTs: numeric("prev_ts"),
	state: text(),
	read: interval(),
	emit: interval(),
	lastReadMs: bigint("last_read_ms", { mode: 'number' }),
	lastEmitMs: bigint("last_emit_ms", { mode: 'number' }),
	seq: bigint({ mode: 'number' }),
	chkpts: bigint({ mode: 'number' }),
	lastChkpt: interval("last_chkpt"),
	batches: bigint({ mode: 'number' }),
	batchesFull: bigint("batches_full", { mode: 'number' }),
	batchesReady: bigint("batches_ready", { mode: 'number' }),
	batchesCheckpoint: bigint("batches_checkpoint", { mode: 'number' }),
	megabytes: bigint({ mode: 'number' }),
	lastKb: bigint("last_kb", { mode: 'number' }),
	rfChk: bigint("rf_chk", { mode: 'number' }),
	rfAdv: bigint("rf_adv", { mode: 'number' }),
	rfLastAdv: interval("rf_last_adv"),
	resolved: numeric(),
	resolvedAge: interval("resolved_age"),
});

export const clusterSessionsInCrdbInternal = crdbInternal.table("cluster_sessions", {
	nodeId: bigint("node_id", { mode: 'number' }).notNull(),
	sessionId: text("session_id"),
	userName: text("user_name"),
	clientAddress: text("client_address"),
	applicationName: text("application_name"),
	activeQueries: text("active_queries"),
	lastActiveQuery: text("last_active_query"),
	numTxnsExecuted: bigint("num_txns_executed", { mode: 'number' }),
	sessionStart: timestamp("session_start", { withTimezone: true }),
	activeQueryStart: timestamp("active_query_start", { withTimezone: true }),
	kvTxn: text("kv_txn"),
	allocBytes: bigint("alloc_bytes", { mode: 'number' }),
	maxAllocBytes: bigint("max_alloc_bytes", { mode: 'number' }),
	status: text(),
	sessionEnd: timestamp("session_end", { withTimezone: true }),
	pgBackendPid: bigint("pg_backend_pid", { mode: 'number' }),
	traceId: bigint("trace_id", { mode: 'number' }),
	goroutineId: bigint("goroutine_id", { mode: 'number' }),
	authenticationMethod: text("authentication_method"),
	isolationLevel: text("isolation_level"),
});

export const clusterSettingsInCrdbInternal = crdbInternal.table("cluster_settings", {
	variable: text().notNull(),
	value: text().notNull(),
	type: text().notNull(),
	public: boolean().notNull(),
	sensitive: boolean().notNull(),
	reportable: boolean().notNull(),
	description: text().notNull(),
	defaultValue: text("default_value").notNull(),
	origin: text().notNull(),
	key: text().notNull(),
});

export const clusterStatementStatisticsInCrdbInternal = crdbInternal.table("cluster_statement_statistics", {
	aggregatedTs: timestamp("aggregated_ts", { withTimezone: true }).notNull(),
	fingerprintId: customType({ dataType: () => 'bytea' })("fingerprint_id").notNull(),
	transactionFingerprintId: customType({ dataType: () => 'bytea' })("transaction_fingerprint_id").notNull(),
	planHash: customType({ dataType: () => 'bytea' })("plan_hash").notNull(),
	appName: text("app_name").notNull(),
	metadata: jsonb().notNull(),
	statistics: jsonb().notNull(),
	sampledPlan: jsonb("sampled_plan").notNull(),
	aggregationInterval: interval("aggregation_interval").notNull(),
	indexRecommendations: text("index_recommendations").array().notNull(),
});

export const clusterTransactionStatisticsInCrdbInternal = crdbInternal.table("cluster_transaction_statistics", {
	aggregatedTs: timestamp("aggregated_ts", { withTimezone: true }).notNull(),
	fingerprintId: customType({ dataType: () => 'bytea' })("fingerprint_id").notNull(),
	appName: text("app_name").notNull(),
	metadata: jsonb().notNull(),
	statistics: jsonb().notNull(),
	aggregationInterval: interval("aggregation_interval").notNull(),
});

export const clusterTransactionsInCrdbInternal = crdbInternal.table("cluster_transactions", {
	id: uuid(),
	nodeId: bigint("node_id", { mode: 'number' }),
	sessionId: text("session_id"),
	start: timestamp(),
	txnString: text("txn_string"),
	applicationName: text("application_name"),
	numStmts: bigint("num_stmts", { mode: 'number' }),
	numRetries: bigint("num_retries", { mode: 'number' }),
	numAutoRetries: bigint("num_auto_retries", { mode: 'number' }),
	lastAutoRetryReason: text("last_auto_retry_reason"),
	isolationLevel: text("isolation_level"),
	priority: text(),
	qualityOfService: text("quality_of_service"),
});

export const clusterTxnExecutionInsightsInCrdbInternal = crdbInternal.table("cluster_txn_execution_insights", {
	txnId: uuid("txn_id").notNull(),
	txnFingerprintId: customType({ dataType: () => 'bytea' })("txn_fingerprint_id").notNull(),
	query: text().notNull(),
	implicitTxn: boolean("implicit_txn").notNull(),
	sessionId: text("session_id").notNull(),
	startTime: timestamp("start_time").notNull(),
	endTime: timestamp("end_time").notNull(),
	userName: text("user_name").notNull(),
	appName: text("app_name").notNull(),
	rowsRead: bigint("rows_read", { mode: 'number' }).notNull(),
	rowsWritten: bigint("rows_written", { mode: 'number' }).notNull(),
	priority: text().notNull(),
	retries: bigint({ mode: 'number' }).notNull(),
	lastRetryReason: text("last_retry_reason"),
	contention: interval(),
	problems: text().array().notNull(),
	causes: text().array().notNull(),
	stmtExecutionIds: text("stmt_execution_ids").array().notNull(),
	cpuSqlNanos: bigint("cpu_sql_nanos", { mode: 'number' }),
	lastErrorCode: text("last_error_code"),
	lastErrorRedactable: text("last_error_redactable"),
	status: text().notNull(),
});

export const createFunctionStatementsInCrdbInternal = crdbInternal.table("create_function_statements", {
	databaseId: bigint("database_id", { mode: 'number' }),
	databaseName: text("database_name"),
	schemaId: bigint("schema_id", { mode: 'number' }),
	schemaName: text("schema_name"),
	functionId: bigint("function_id", { mode: 'number' }),
	functionName: text("function_name"),
	createStatement: text("create_statement"),
});

export const createProcedureStatementsInCrdbInternal = crdbInternal.table("create_procedure_statements", {
	databaseId: bigint("database_id", { mode: 'number' }),
	databaseName: text("database_name"),
	schemaId: bigint("schema_id", { mode: 'number' }),
	schemaName: text("schema_name"),
	procedureId: bigint("procedure_id", { mode: 'number' }),
	procedureName: text("procedure_name"),
	createStatement: text("create_statement"),
});

export const createSchemaStatementsInCrdbInternal = crdbInternal.table("create_schema_statements", {
	databaseId: bigint("database_id", { mode: 'number' }),
	databaseName: text("database_name"),
	schemaName: text("schema_name"),
	descriptorId: bigint("descriptor_id", { mode: 'number' }),
	createStatement: text("create_statement"),
});

export const createStatementsInCrdbInternal = crdbInternal.table("create_statements", {
	databaseId: bigint("database_id", { mode: 'number' }),
	databaseName: text("database_name"),
	schemaName: text("schema_name").notNull(),
	descriptorId: bigint("descriptor_id", { mode: 'number' }),
	descriptorType: text("descriptor_type").notNull(),
	descriptorName: text("descriptor_name").notNull(),
	createStatement: text("create_statement").notNull(),
	state: text().notNull(),
	createNofks: text("create_nofks").notNull(),
	rlsStatements: text("rls_statements").array().notNull(),
	fkStatements: text("fk_statements").array().notNull(),
	validateStatements: text("validate_statements").array().notNull(),
	createRedactable: text("create_redactable").notNull(),
	hasPartitions: boolean("has_partitions").notNull(),
	isMultiRegion: boolean("is_multi_region").notNull(),
	isVirtual: boolean("is_virtual").notNull(),
	isTemporary: boolean("is_temporary").notNull(),
});

export const createTriggerStatementsInCrdbInternal = crdbInternal.table("create_trigger_statements", {
	databaseId: bigint("database_id", { mode: 'number' }),
	databaseName: text("database_name"),
	schemaId: bigint("schema_id", { mode: 'number' }),
	schemaName: text("schema_name"),
	tableId: bigint("table_id", { mode: 'number' }),
	tableName: text("table_name"),
	triggerId: bigint("trigger_id", { mode: 'number' }),
	triggerName: text("trigger_name"),
	createStatement: text("create_statement"),
});

export const createTypeStatementsInCrdbInternal = crdbInternal.table("create_type_statements", {
	databaseId: bigint("database_id", { mode: 'number' }),
	databaseName: text("database_name"),
	schemaName: text("schema_name"),
	descriptorId: bigint("descriptor_id", { mode: 'number' }),
	descriptorName: text("descriptor_name"),
	createStatement: text("create_statement"),
	enumMembers: text("enum_members").array(),
});

export const crossDbReferencesInCrdbInternal = crdbInternal.table("cross_db_references", {
	objectDatabase: text("object_database").notNull(),
	objectSchema: text("object_schema").notNull(),
	objectName: text("object_name").notNull(),
	referencedObjectDatabase: text("referenced_object_database").notNull(),
	referencedObjectSchema: text("referenced_object_schema").notNull(),
	referencedObjectName: text("referenced_object_name").notNull(),
	crossDatabaseReferenceDescription: text("cross_database_reference_description").notNull(),
});

export const databasesInCrdbInternal = crdbInternal.table("databases", {
	id: bigint({ mode: 'number' }).notNull(),
	name: text().notNull(),
	owner: customType({ dataType: () => 'name' })().notNull(),
	primaryRegion: text("primary_region"),
	secondaryRegion: text("secondary_region"),
	regions: text().array(),
	survivalGoal: text("survival_goal"),
	placementPolicy: text("placement_policy"),
	createStatement: text("create_statement").notNull(),
});

export const defaultPrivilegesInCrdbInternal = crdbInternal.table("default_privileges", {
	databaseName: text("database_name").notNull(),
	schemaName: text("schema_name"),
	role: text(),
	forAllRoles: boolean("for_all_roles"),
	objectType: text("object_type").notNull(),
	grantee: text().notNull(),
	privilegeType: text("privilege_type").notNull(),
	isGrantable: boolean("is_grantable"),
});

export const featureUsageInCrdbInternal = crdbInternal.table("feature_usage", {
	featureName: text("feature_name").notNull(),
	usageCount: bigint("usage_count", { mode: 'number' }).notNull(),
});

export const forwardDependenciesInCrdbInternal = crdbInternal.table("forward_dependencies", {
	descriptorId: bigint("descriptor_id", { mode: 'number' }),
	descriptorName: text("descriptor_name").notNull(),
	indexId: bigint("index_id", { mode: 'number' }),
	dependedonbyId: bigint("dependedonby_id", { mode: 'number' }).notNull(),
	dependedonbyType: text("dependedonby_type").notNull(),
	dependedonbyIndexId: bigint("dependedonby_index_id", { mode: 'number' }),
	dependedonbyName: text("dependedonby_name"),
	dependedonbyDetails: text("dependedonby_details"),
});

export const gossipAlertsInCrdbInternal = crdbInternal.table("gossip_alerts", {
	nodeId: bigint("node_id", { mode: 'number' }).notNull(),
	storeId: bigint("store_id", { mode: 'number' }),
	category: text().notNull(),
	description: text().notNull(),
	value: doublePrecision().notNull(),
});

export const gossipLivenessInCrdbInternal = crdbInternal.table("gossip_liveness", {
	nodeId: bigint("node_id", { mode: 'number' }).notNull(),
	epoch: bigint({ mode: 'number' }).notNull(),
	expiration: text().notNull(),
	draining: boolean().notNull(),
	decommissioning: boolean().notNull(),
	membership: text().notNull(),
	updatedAt: timestamp("updated_at"),
});

export const gossipNetworkInCrdbInternal = crdbInternal.table("gossip_network", {
	sourceId: bigint("source_id", { mode: 'number' }).notNull(),
	targetId: bigint("target_id", { mode: 'number' }).notNull(),
});

export const gossipNodesInCrdbInternal = crdbInternal.table("gossip_nodes", {
	nodeId: bigint("node_id", { mode: 'number' }).notNull(),
	network: text().notNull(),
	address: text().notNull(),
	advertiseAddress: text("advertise_address").notNull(),
	sqlNetwork: text("sql_network").notNull(),
	sqlAddress: text("sql_address").notNull(),
	advertiseSqlAddress: text("advertise_sql_address").notNull(),
	attrs: jsonb().notNull(),
	locality: text().notNull(),
	clusterName: text("cluster_name").notNull(),
	serverVersion: text("server_version").notNull(),
	buildTag: text("build_tag").notNull(),
	startedAt: timestamp("started_at").notNull(),
	isLive: boolean("is_live").notNull(),
	ranges: bigint({ mode: 'number' }).notNull(),
	leases: bigint({ mode: 'number' }).notNull(),
});

export const indexColumnsInCrdbInternal = crdbInternal.table("index_columns", {
	descriptorId: bigint("descriptor_id", { mode: 'number' }),
	descriptorName: text("descriptor_name").notNull(),
	indexId: bigint("index_id", { mode: 'number' }).notNull(),
	indexName: text("index_name").notNull(),
	columnType: text("column_type").notNull(),
	columnId: bigint("column_id", { mode: 'number' }).notNull(),
	columnName: text("column_name"),
	columnDirection: text("column_direction"),
	implicit: boolean(),
});

export const indexSpansInCrdbInternal = crdbInternal.table("index_spans", {
	descriptorId: bigint("descriptor_id", { mode: 'number' }).notNull(),
	indexId: bigint("index_id", { mode: 'number' }).notNull(),
	startKey: customType({ dataType: () => 'bytea' })("start_key").notNull(),
	endKey: customType({ dataType: () => 'bytea' })("end_key").notNull(),
});

export const indexUsageStatisticsInCrdbInternal = crdbInternal.table("index_usage_statistics", {
	tableId: bigint("table_id", { mode: 'number' }).notNull(),
	indexId: bigint("index_id", { mode: 'number' }).notNull(),
	totalReads: bigint("total_reads", { mode: 'number' }).notNull(),
	lastRead: timestamp("last_read", { withTimezone: true }),
});

export const invalidObjectsInCrdbInternal = crdbInternal.table("invalid_objects", {
	id: bigint({ mode: 'number' }),
	databaseName: text("database_name"),
	schemaName: text("schema_name"),
	objName: text("obj_name"),
	error: text(),
	errorRedactable: text("error_redactable"),
});

export const kvBuiltinFunctionCommentsInCrdbInternal = crdbInternal.table("kv_builtin_function_comments", {
	oid: customType({ dataType: () => 'oid' })().notNull(),
	description: text().notNull(),
});

export const kvCatalogCommentsInCrdbInternal = crdbInternal.table("kv_catalog_comments", {
	classoid: customType({ dataType: () => 'oid' })().notNull(),
	objoid: customType({ dataType: () => 'oid' })().notNull(),
	objsubid: integer().notNull(),
	description: text().notNull(),
});

export const kvCatalogDescriptorInCrdbInternal = crdbInternal.table("kv_catalog_descriptor", {
	id: bigint({ mode: 'number' }).notNull(),
	descriptor: jsonb().notNull(),
});

export const kvCatalogNamespaceInCrdbInternal = crdbInternal.table("kv_catalog_namespace", {
	parentId: bigint("parent_id", { mode: 'number' }).notNull(),
	parentSchemaId: bigint("parent_schema_id", { mode: 'number' }).notNull(),
	name: text().notNull(),
	id: bigint({ mode: 'number' }).notNull(),
});

export const kvCatalogZonesInCrdbInternal = crdbInternal.table("kv_catalog_zones", {
	id: bigint({ mode: 'number' }).notNull(),
	config: jsonb().notNull(),
});

export const kvFlowControlHandlesInCrdbInternal = crdbInternal.table("kv_flow_control_handles", {
	rangeId: bigint("range_id", { mode: 'number' }).notNull(),
	tenantId: bigint("tenant_id", { mode: 'number' }).notNull(),
	storeId: bigint("store_id", { mode: 'number' }).notNull(),
	totalTrackedTokens: bigint("total_tracked_tokens", { mode: 'number' }).notNull(),
});

export const kvFlowControlHandlesV2InCrdbInternal = crdbInternal.table("kv_flow_control_handles_v2", {
	rangeId: bigint("range_id", { mode: 'number' }).notNull(),
	tenantId: bigint("tenant_id", { mode: 'number' }).notNull(),
	storeId: bigint("store_id", { mode: 'number' }).notNull(),
	totalTrackedTokens: bigint("total_tracked_tokens", { mode: 'number' }).notNull(),
	totalEvalDeductedTokens: bigint("total_eval_deducted_tokens", { mode: 'number' }).notNull(),
	totalSendDeductedTokens: bigint("total_send_deducted_tokens", { mode: 'number' }).notNull(),
});

export const kvFlowControllerInCrdbInternal = crdbInternal.table("kv_flow_controller", {
	tenantId: bigint("tenant_id", { mode: 'number' }).notNull(),
	storeId: bigint("store_id", { mode: 'number' }).notNull(),
	availableRegularTokens: bigint("available_regular_tokens", { mode: 'number' }).notNull(),
	availableElasticTokens: bigint("available_elastic_tokens", { mode: 'number' }).notNull(),
});

export const kvFlowControllerV2InCrdbInternal = crdbInternal.table("kv_flow_controller_v2", {
	tenantId: bigint("tenant_id", { mode: 'number' }).notNull(),
	storeId: bigint("store_id", { mode: 'number' }).notNull(),
	availableEvalRegularTokens: bigint("available_eval_regular_tokens", { mode: 'number' }).notNull(),
	availableEvalElasticTokens: bigint("available_eval_elastic_tokens", { mode: 'number' }).notNull(),
	availableSendRegularTokens: bigint("available_send_regular_tokens", { mode: 'number' }).notNull(),
	availableSendElasticTokens: bigint("available_send_elastic_tokens", { mode: 'number' }).notNull(),
});

export const kvFlowTokenDeductionsInCrdbInternal = crdbInternal.table("kv_flow_token_deductions", {
	rangeId: bigint("range_id", { mode: 'number' }).notNull(),
	tenantId: bigint("tenant_id", { mode: 'number' }).notNull(),
	storeId: bigint("store_id", { mode: 'number' }).notNull(),
	priority: text().notNull(),
	logTerm: bigint("log_term", { mode: 'number' }).notNull(),
	logIndex: bigint("log_index", { mode: 'number' }).notNull(),
	tokens: bigint({ mode: 'number' }).notNull(),
});

export const kvFlowTokenDeductionsV2InCrdbInternal = crdbInternal.table("kv_flow_token_deductions_v2", {
	rangeId: bigint("range_id", { mode: 'number' }).notNull(),
	tenantId: bigint("tenant_id", { mode: 'number' }).notNull(),
	storeId: bigint("store_id", { mode: 'number' }).notNull(),
	priority: text().notNull(),
	logTerm: bigint("log_term", { mode: 'number' }).notNull(),
	logIndex: bigint("log_index", { mode: 'number' }).notNull(),
	tokens: bigint({ mode: 'number' }).notNull(),
});

export const kvInheritedRoleMembersInCrdbInternal = crdbInternal.table("kv_inherited_role_members", {
	role: text(),
	inheritingMember: text("inheriting_member"),
	memberIsExplicit: boolean("member_is_explicit"),
	memberIsAdmin: boolean("member_is_admin"),
});

export const kvNodeLivenessInCrdbInternal = crdbInternal.table("kv_node_liveness", {
	nodeId: bigint("node_id", { mode: 'number' }).notNull(),
	epoch: bigint({ mode: 'number' }).notNull(),
	expiration: text().notNull(),
	draining: boolean().notNull(),
	membership: text().notNull(),
});

export const kvNodeStatusInCrdbInternal = crdbInternal.table("kv_node_status", {
	nodeId: bigint("node_id", { mode: 'number' }).notNull(),
	network: text().notNull(),
	address: text().notNull(),
	attrs: jsonb().notNull(),
	locality: text().notNull(),
	serverVersion: text("server_version").notNull(),
	goVersion: text("go_version").notNull(),
	tag: text().notNull(),
	time: text().notNull(),
	revision: text().notNull(),
	cgoCompiler: text("cgo_compiler").notNull(),
	platform: text().notNull(),
	distribution: text().notNull(),
	type: text().notNull(),
	dependencies: text().notNull(),
	startedAt: timestamp("started_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
	metrics: jsonb().notNull(),
	args: jsonb().notNull(),
	env: jsonb().notNull(),
	activity: jsonb().notNull(),
});

export const kvProtectedTsRecordsInCrdbInternal = crdbInternal.table("kv_protected_ts_records", {
	id: uuid().notNull(),
	ts: numeric().notNull(),
	metaType: text("meta_type").notNull(),
	meta: customType({ dataType: () => 'bytea' })(),
	numSpans: bigint("num_spans", { mode: 'number' }).notNull(),
	spans: customType({ dataType: () => 'bytea' })().notNull(),
	verified: boolean().notNull(),
	target: customType({ dataType: () => 'bytea' })(),
	decodedMeta: jsonb("decoded_meta"),
	decodedTarget: jsonb("decoded_target"),
	internalMeta: jsonb("internal_meta"),
	numRanges: bigint("num_ranges", { mode: 'number' }),
	lastUpdated: numeric("last_updated"),
});

export const kvStoreStatusInCrdbInternal = crdbInternal.table("kv_store_status", {
	nodeId: bigint("node_id", { mode: 'number' }).notNull(),
	storeId: bigint("store_id", { mode: 'number' }).notNull(),
	attrs: jsonb().notNull(),
	capacity: bigint({ mode: 'number' }).notNull(),
	available: bigint({ mode: 'number' }).notNull(),
	used: bigint({ mode: 'number' }).notNull(),
	logicalBytes: bigint("logical_bytes", { mode: 'number' }).notNull(),
	rangeCount: bigint("range_count", { mode: 'number' }).notNull(),
	leaseCount: bigint("lease_count", { mode: 'number' }).notNull(),
	writesPerSecond: doublePrecision("writes_per_second").notNull(),
	bytesPerReplica: jsonb("bytes_per_replica").notNull(),
	writesPerReplica: jsonb("writes_per_replica").notNull(),
	metrics: jsonb().notNull(),
	properties: jsonb().notNull(),
});

export const leasesInCrdbInternal = crdbInternal.table("leases", {
	nodeId: bigint("node_id", { mode: 'number' }).notNull(),
	tableId: bigint("table_id", { mode: 'number' }).notNull(),
	name: text().notNull(),
	parentId: bigint("parent_id", { mode: 'number' }).notNull(),
	expiration: timestamp().notNull(),
	deleted: boolean().notNull(),
});

export const logicalReplicationNodeProcessorsInCrdbInternal = crdbInternal.table("logical_replication_node_processors", {
	streamId: bigint("stream_id", { mode: 'number' }),
	consumer: text(),
	state: text(),
	recvTime: interval("recv_time"),
	lastRecvTime: interval("last_recv_time"),
	ingestTime: interval("ingest_time"),
	flushTime: interval("flush_time"),
	flushCount: bigint("flush_count", { mode: 'number' }),
	flushKvs: bigint("flush_kvs", { mode: 'number' }),
	flushBytes: bigint("flush_bytes", { mode: 'number' }),
	flushBatches: bigint("flush_batches", { mode: 'number' }),
	lastFlushTime: interval("last_flush_time"),
	chunksRunning: bigint("chunks_running", { mode: 'number' }),
	chunksDone: bigint("chunks_done", { mode: 'number' }),
	lastKvsDone: bigint("last_kvs_done", { mode: 'number' }),
	lastKvsTodo: bigint("last_kvs_todo", { mode: 'number' }),
	lastBatches: bigint("last_batches", { mode: 'number' }),
	lastSlowest: interval("last_slowest"),
	lastCheckpoint: interval("last_checkpoint"),
	checkpoints: bigint({ mode: 'number' }),
	retrySize: bigint("retry_size", { mode: 'number' }),
	resolvedAge: interval("resolved_age"),
});

export const lostDescriptorsWithDataInCrdbInternal = crdbInternal.table("lost_descriptors_with_data", {
	descid: bigint({ mode: 'number' }).notNull(),
});

export const nodeBuildInfoInCrdbInternal = crdbInternal.table("node_build_info", {
	nodeId: bigint("node_id", { mode: 'number' }).notNull(),
	field: text().notNull(),
	value: text().notNull(),
});

export const nodeContentionEventsInCrdbInternal = crdbInternal.table("node_contention_events", {
	tableId: bigint("table_id", { mode: 'number' }),
	indexId: bigint("index_id", { mode: 'number' }),
	numContentionEvents: bigint("num_contention_events", { mode: 'number' }).notNull(),
	cumulativeContentionTime: interval("cumulative_contention_time").notNull(),
	key: customType({ dataType: () => 'bytea' })().notNull(),
	txnId: uuid("txn_id").notNull(),
	count: bigint({ mode: 'number' }).notNull(),
});

export const nodeDistsqlFlowsInCrdbInternal = crdbInternal.table("node_distsql_flows", {
	flowId: uuid("flow_id").notNull(),
	nodeId: bigint("node_id", { mode: 'number' }).notNull(),
	stmt: text(),
	since: timestamp({ withTimezone: true }).notNull(),
});

export const nodeExecutionInsightsInCrdbInternal = crdbInternal.table("node_execution_insights", {
	sessionId: text("session_id").notNull(),
	txnId: uuid("txn_id").notNull(),
	txnFingerprintId: customType({ dataType: () => 'bytea' })("txn_fingerprint_id").notNull(),
	stmtId: text("stmt_id").notNull(),
	stmtFingerprintId: customType({ dataType: () => 'bytea' })("stmt_fingerprint_id").notNull(),
	problem: text().notNull(),
	causes: text().array().notNull(),
	query: text().notNull(),
	status: text().notNull(),
	startTime: timestamp("start_time").notNull(),
	endTime: timestamp("end_time").notNull(),
	fullScan: boolean("full_scan").notNull(),
	userName: text("user_name").notNull(),
	appName: text("app_name").notNull(),
	databaseName: text("database_name").notNull(),
	planGist: text("plan_gist").notNull(),
	rowsRead: bigint("rows_read", { mode: 'number' }).notNull(),
	rowsWritten: bigint("rows_written", { mode: 'number' }).notNull(),
	priority: text().notNull(),
	retries: bigint({ mode: 'number' }).notNull(),
	lastRetryReason: text("last_retry_reason"),
	execNodeIds: bigint("exec_node_ids", { mode: 'number' }).array().notNull(),
	kvNodeIds: bigint("kv_node_ids", { mode: 'number' }).array().notNull(),
	contention: interval(),
	indexRecommendations: text("index_recommendations").array().notNull(),
	implicitTxn: boolean("implicit_txn").notNull(),
	cpuSqlNanos: bigint("cpu_sql_nanos", { mode: 'number' }),
	errorCode: text("error_code"),
	lastErrorRedactable: text("last_error_redactable"),
	queryTags: jsonb("query_tags"),
});

export const nodeInflightTraceSpansInCrdbInternal = crdbInternal.table("node_inflight_trace_spans", {
	traceId: bigint("trace_id", { mode: 'number' }).notNull(),
	parentSpanId: bigint("parent_span_id", { mode: 'number' }).notNull(),
	spanId: bigint("span_id", { mode: 'number' }).notNull(),
	goroutineId: bigint("goroutine_id", { mode: 'number' }).notNull(),
	finished: boolean().notNull(),
	startTime: timestamp("start_time", { withTimezone: true }),
	duration: interval(),
	operation: text(),
});

export const nodeMemoryMonitorsInCrdbInternal = crdbInternal.table("node_memory_monitors", {
	level: bigint({ mode: 'number' }),
	name: text(),
	id: bigint({ mode: 'number' }),
	parentId: bigint("parent_id", { mode: 'number' }),
	used: bigint({ mode: 'number' }),
	reservedUsed: bigint("reserved_used", { mode: 'number' }),
	reservedReserved: bigint("reserved_reserved", { mode: 'number' }),
	stopped: boolean(),
});

export const nodeMetricsInCrdbInternal = crdbInternal.table("node_metrics", {
	storeId: bigint("store_id", { mode: 'number' }),
	name: text().notNull(),
	value: doublePrecision().notNull(),
});

export const nodeQueriesInCrdbInternal = crdbInternal.table("node_queries", {
	queryId: text("query_id"),
	txnId: uuid("txn_id"),
	nodeId: bigint("node_id", { mode: 'number' }).notNull(),
	sessionId: text("session_id"),
	userName: text("user_name"),
	start: timestamp({ withTimezone: true }),
	query: text(),
	clientAddress: text("client_address"),
	applicationName: text("application_name"),
	distributed: boolean(),
	phase: text(),
	fullScan: boolean("full_scan"),
	planGist: text("plan_gist"),
	database: text(),
	isolationLevel: text("isolation_level"),
	numTxnRetries: bigint("num_txn_retries", { mode: 'number' }),
	numTxnAutoRetries: bigint("num_txn_auto_retries", { mode: 'number' }),
});

export const nodeRuntimeInfoInCrdbInternal = crdbInternal.table("node_runtime_info", {
	nodeId: bigint("node_id", { mode: 'number' }).notNull(),
	component: text().notNull(),
	field: text().notNull(),
	value: text().notNull(),
});

export const nodeSessionsInCrdbInternal = crdbInternal.table("node_sessions", {
	nodeId: bigint("node_id", { mode: 'number' }).notNull(),
	sessionId: text("session_id"),
	userName: text("user_name"),
	clientAddress: text("client_address"),
	applicationName: text("application_name"),
	activeQueries: text("active_queries"),
	lastActiveQuery: text("last_active_query"),
	numTxnsExecuted: bigint("num_txns_executed", { mode: 'number' }),
	sessionStart: timestamp("session_start", { withTimezone: true }),
	activeQueryStart: timestamp("active_query_start", { withTimezone: true }),
	kvTxn: text("kv_txn"),
	allocBytes: bigint("alloc_bytes", { mode: 'number' }),
	maxAllocBytes: bigint("max_alloc_bytes", { mode: 'number' }),
	status: text(),
	sessionEnd: timestamp("session_end", { withTimezone: true }),
	pgBackendPid: bigint("pg_backend_pid", { mode: 'number' }),
	traceId: bigint("trace_id", { mode: 'number' }),
	goroutineId: bigint("goroutine_id", { mode: 'number' }),
	authenticationMethod: text("authentication_method"),
	isolationLevel: text("isolation_level"),
});

export const nodeStatementStatisticsInCrdbInternal = crdbInternal.table("node_statement_statistics", {
	nodeId: bigint("node_id", { mode: 'number' }).notNull(),
	applicationName: text("application_name").notNull(),
	flags: text().notNull(),
	statementId: text("statement_id").notNull(),
	key: text().notNull(),
	anonymized: text(),
	count: bigint({ mode: 'number' }).notNull(),
	firstAttemptCount: bigint("first_attempt_count", { mode: 'number' }).notNull(),
	maxRetries: bigint("max_retries", { mode: 'number' }).notNull(),
	lastError: text("last_error"),
	lastErrorCode: text("last_error_code"),
	rowsAvg: doublePrecision("rows_avg").notNull(),
	rowsVar: doublePrecision("rows_var").notNull(),
	idleLatAvg: doublePrecision("idle_lat_avg").notNull(),
	idleLatVar: doublePrecision("idle_lat_var").notNull(),
	parseLatAvg: doublePrecision("parse_lat_avg").notNull(),
	parseLatVar: doublePrecision("parse_lat_var").notNull(),
	planLatAvg: doublePrecision("plan_lat_avg").notNull(),
	planLatVar: doublePrecision("plan_lat_var").notNull(),
	runLatAvg: doublePrecision("run_lat_avg").notNull(),
	runLatVar: doublePrecision("run_lat_var").notNull(),
	serviceLatAvg: doublePrecision("service_lat_avg").notNull(),
	serviceLatVar: doublePrecision("service_lat_var").notNull(),
	overheadLatAvg: doublePrecision("overhead_lat_avg").notNull(),
	overheadLatVar: doublePrecision("overhead_lat_var").notNull(),
	bytesReadAvg: doublePrecision("bytes_read_avg").notNull(),
	bytesReadVar: doublePrecision("bytes_read_var").notNull(),
	rowsReadAvg: doublePrecision("rows_read_avg").notNull(),
	rowsReadVar: doublePrecision("rows_read_var").notNull(),
	rowsWrittenAvg: doublePrecision("rows_written_avg").notNull(),
	rowsWrittenVar: doublePrecision("rows_written_var").notNull(),
	networkBytesAvg: doublePrecision("network_bytes_avg"),
	networkBytesVar: doublePrecision("network_bytes_var"),
	networkMsgsAvg: doublePrecision("network_msgs_avg"),
	networkMsgsVar: doublePrecision("network_msgs_var"),
	maxMemUsageAvg: doublePrecision("max_mem_usage_avg"),
	maxMemUsageVar: doublePrecision("max_mem_usage_var"),
	maxDiskUsageAvg: doublePrecision("max_disk_usage_avg"),
	maxDiskUsageVar: doublePrecision("max_disk_usage_var"),
	contentionTimeAvg: doublePrecision("contention_time_avg"),
	contentionTimeVar: doublePrecision("contention_time_var"),
	cpuSqlNanosAvg: doublePrecision("cpu_sql_nanos_avg"),
	cpuSqlNanosVar: doublePrecision("cpu_sql_nanos_var"),
	mvccStepAvg: doublePrecision("mvcc_step_avg"),
	mvccStepVar: doublePrecision("mvcc_step_var"),
	mvccStepInternalAvg: doublePrecision("mvcc_step_internal_avg"),
	mvccStepInternalVar: doublePrecision("mvcc_step_internal_var"),
	mvccSeekAvg: doublePrecision("mvcc_seek_avg"),
	mvccSeekVar: doublePrecision("mvcc_seek_var"),
	mvccSeekInternalAvg: doublePrecision("mvcc_seek_internal_avg"),
	mvccSeekInternalVar: doublePrecision("mvcc_seek_internal_var"),
	mvccBlockBytesAvg: doublePrecision("mvcc_block_bytes_avg"),
	mvccBlockBytesVar: doublePrecision("mvcc_block_bytes_var"),
	mvccBlockBytesInCacheAvg: doublePrecision("mvcc_block_bytes_in_cache_avg"),
	mvccBlockBytesInCacheVar: doublePrecision("mvcc_block_bytes_in_cache_var"),
	mvccKeyBytesAvg: doublePrecision("mvcc_key_bytes_avg"),
	mvccKeyBytesVar: doublePrecision("mvcc_key_bytes_var"),
	mvccValueBytesAvg: doublePrecision("mvcc_value_bytes_avg"),
	mvccValueBytesVar: doublePrecision("mvcc_value_bytes_var"),
	mvccPointCountAvg: doublePrecision("mvcc_point_count_avg"),
	mvccPointCountVar: doublePrecision("mvcc_point_count_var"),
	mvccPointsCoveredByRangeTombstonesAvg: doublePrecision("mvcc_points_covered_by_range_tombstones_avg"),
	mvccPointsCoveredByRangeTombstonesVar: doublePrecision("mvcc_points_covered_by_range_tombstones_var"),
	mvccRangeKeyCountAvg: doublePrecision("mvcc_range_key_count_avg"),
	mvccRangeKeyCountVar: doublePrecision("mvcc_range_key_count_var"),
	mvccRangeKeyContainedPointsAvg: doublePrecision("mvcc_range_key_contained_points_avg"),
	mvccRangeKeyContainedPointsVar: doublePrecision("mvcc_range_key_contained_points_var"),
	mvccRangeKeySkippedPointsAvg: doublePrecision("mvcc_range_key_skipped_points_avg"),
	mvccRangeKeySkippedPointsVar: doublePrecision("mvcc_range_key_skipped_points_var"),
	implicitTxn: boolean("implicit_txn").notNull(),
	fullScan: boolean("full_scan").notNull(),
	samplePlan: jsonb("sample_plan"),
	databaseName: text("database_name").notNull(),
	execNodeIds: bigint("exec_node_ids", { mode: 'number' }).array().notNull(),
	kvNodeIds: bigint("kv_node_ids", { mode: 'number' }).array().notNull(),
	usedFollowerRead: boolean("used_follower_read").notNull(),
	txnFingerprintId: text("txn_fingerprint_id"),
	indexRecommendations: text("index_recommendations").array().notNull(),
	latencySecondsMin: doublePrecision("latency_seconds_min"),
	latencySecondsMax: doublePrecision("latency_seconds_max"),
	failureCount: bigint("failure_count", { mode: 'number' }).notNull(),
});

export const nodeTenantCapabilitiesCacheInCrdbInternal = crdbInternal.table("node_tenant_capabilities_cache", {
	tenantId: bigint("tenant_id", { mode: 'number' }),
	capabilityName: text("capability_name"),
	capabilityValue: text("capability_value"),
});

export const nodeTransactionStatisticsInCrdbInternal = crdbInternal.table("node_transaction_statistics", {
	nodeId: bigint("node_id", { mode: 'number' }).notNull(),
	applicationName: text("application_name").notNull(),
	key: text(),
	statementIds: text("statement_ids").array(),
	count: bigint({ mode: 'number' }),
	maxRetries: bigint("max_retries", { mode: 'number' }),
	serviceLatAvg: doublePrecision("service_lat_avg").notNull(),
	serviceLatVar: doublePrecision("service_lat_var").notNull(),
	retryLatAvg: doublePrecision("retry_lat_avg").notNull(),
	retryLatVar: doublePrecision("retry_lat_var").notNull(),
	commitLatAvg: doublePrecision("commit_lat_avg").notNull(),
	commitLatVar: doublePrecision("commit_lat_var").notNull(),
	idleLatAvg: doublePrecision("idle_lat_avg").notNull(),
	idleLatVar: doublePrecision("idle_lat_var").notNull(),
	rowsReadAvg: doublePrecision("rows_read_avg").notNull(),
	rowsReadVar: doublePrecision("rows_read_var").notNull(),
	networkBytesAvg: doublePrecision("network_bytes_avg"),
	networkBytesVar: doublePrecision("network_bytes_var"),
	networkMsgsAvg: doublePrecision("network_msgs_avg"),
	networkMsgsVar: doublePrecision("network_msgs_var"),
	maxMemUsageAvg: doublePrecision("max_mem_usage_avg"),
	maxMemUsageVar: doublePrecision("max_mem_usage_var"),
	maxDiskUsageAvg: doublePrecision("max_disk_usage_avg"),
	maxDiskUsageVar: doublePrecision("max_disk_usage_var"),
	contentionTimeAvg: doublePrecision("contention_time_avg"),
	contentionTimeVar: doublePrecision("contention_time_var"),
	cpuSqlNanosAvg: doublePrecision("cpu_sql_nanos_avg"),
	cpuSqlNanosVar: doublePrecision("cpu_sql_nanos_var"),
	mvccStepAvg: doublePrecision("mvcc_step_avg"),
	mvccStepVar: doublePrecision("mvcc_step_var"),
	mvccStepInternalAvg: doublePrecision("mvcc_step_internal_avg"),
	mvccStepInternalVar: doublePrecision("mvcc_step_internal_var"),
	mvccSeekAvg: doublePrecision("mvcc_seek_avg"),
	mvccSeekVar: doublePrecision("mvcc_seek_var"),
	mvccSeekInternalAvg: doublePrecision("mvcc_seek_internal_avg"),
	mvccSeekInternalVar: doublePrecision("mvcc_seek_internal_var"),
	mvccBlockBytesAvg: doublePrecision("mvcc_block_bytes_avg"),
	mvccBlockBytesVar: doublePrecision("mvcc_block_bytes_var"),
	mvccBlockBytesInCacheAvg: doublePrecision("mvcc_block_bytes_in_cache_avg"),
	mvccBlockBytesInCacheVar: doublePrecision("mvcc_block_bytes_in_cache_var"),
	mvccKeyBytesAvg: doublePrecision("mvcc_key_bytes_avg"),
	mvccKeyBytesVar: doublePrecision("mvcc_key_bytes_var"),
	mvccValueBytesAvg: doublePrecision("mvcc_value_bytes_avg"),
	mvccValueBytesVar: doublePrecision("mvcc_value_bytes_var"),
	mvccPointCountAvg: doublePrecision("mvcc_point_count_avg"),
	mvccPointCountVar: doublePrecision("mvcc_point_count_var"),
	mvccPointsCoveredByRangeTombstonesAvg: doublePrecision("mvcc_points_covered_by_range_tombstones_avg"),
	mvccPointsCoveredByRangeTombstonesVar: doublePrecision("mvcc_points_covered_by_range_tombstones_var"),
	mvccRangeKeyCountAvg: doublePrecision("mvcc_range_key_count_avg"),
	mvccRangeKeyCountVar: doublePrecision("mvcc_range_key_count_var"),
	mvccRangeKeyContainedPointsAvg: doublePrecision("mvcc_range_key_contained_points_avg"),
	mvccRangeKeyContainedPointsVar: doublePrecision("mvcc_range_key_contained_points_var"),
	mvccRangeKeySkippedPointsAvg: doublePrecision("mvcc_range_key_skipped_points_avg"),
	mvccRangeKeySkippedPointsVar: doublePrecision("mvcc_range_key_skipped_points_var"),
});

export const nodeTransactionsInCrdbInternal = crdbInternal.table("node_transactions", {
	id: uuid(),
	nodeId: bigint("node_id", { mode: 'number' }),
	sessionId: text("session_id"),
	start: timestamp(),
	txnString: text("txn_string"),
	applicationName: text("application_name"),
	numStmts: bigint("num_stmts", { mode: 'number' }),
	numRetries: bigint("num_retries", { mode: 'number' }),
	numAutoRetries: bigint("num_auto_retries", { mode: 'number' }),
	lastAutoRetryReason: text("last_auto_retry_reason"),
	isolationLevel: text("isolation_level"),
	priority: text(),
	qualityOfService: text("quality_of_service"),
});

export const nodeTxnExecutionInsightsInCrdbInternal = crdbInternal.table("node_txn_execution_insights", {
	txnId: uuid("txn_id").notNull(),
	txnFingerprintId: customType({ dataType: () => 'bytea' })("txn_fingerprint_id").notNull(),
	query: text().notNull(),
	implicitTxn: boolean("implicit_txn").notNull(),
	sessionId: text("session_id").notNull(),
	startTime: timestamp("start_time").notNull(),
	endTime: timestamp("end_time").notNull(),
	userName: text("user_name").notNull(),
	appName: text("app_name").notNull(),
	rowsRead: bigint("rows_read", { mode: 'number' }).notNull(),
	rowsWritten: bigint("rows_written", { mode: 'number' }).notNull(),
	priority: text().notNull(),
	retries: bigint({ mode: 'number' }).notNull(),
	lastRetryReason: text("last_retry_reason"),
	contention: interval(),
	problems: text().array().notNull(),
	causes: text().array().notNull(),
	stmtExecutionIds: text("stmt_execution_ids").array().notNull(),
	cpuSqlNanos: bigint("cpu_sql_nanos", { mode: 'number' }),
	lastErrorCode: text("last_error_code"),
	lastErrorRedactable: text("last_error_redactable"),
	status: text().notNull(),
});

export const nodeTxnStatsInCrdbInternal = crdbInternal.table("node_txn_stats", {
	nodeId: bigint("node_id", { mode: 'number' }).notNull(),
	applicationName: text("application_name").notNull(),
	txnCount: bigint("txn_count", { mode: 'number' }).notNull(),
	txnTimeAvgSec: doublePrecision("txn_time_avg_sec").notNull(),
	txnTimeVarSec: doublePrecision("txn_time_var_sec").notNull(),
	committedCount: bigint("committed_count", { mode: 'number' }).notNull(),
	implicitCount: bigint("implicit_count", { mode: 'number' }).notNull(),
});

export const partitionsInCrdbInternal = crdbInternal.table("partitions", {
	tableId: bigint("table_id", { mode: 'number' }).notNull(),
	indexId: bigint("index_id", { mode: 'number' }).notNull(),
	parentName: text("parent_name"),
	name: text().notNull(),
	columns: bigint({ mode: 'number' }).notNull(),
	columnNames: text("column_names"),
	listValue: text("list_value"),
	rangeValue: text("range_value"),
	zoneId: bigint("zone_id", { mode: 'number' }),
	subzoneId: bigint("subzone_id", { mode: 'number' }),
});

export const pgCatalogTableIsImplementedInCrdbInternal = crdbInternal.table("pg_catalog_table_is_implemented", {
	name: text().notNull(),
	implemented: boolean(),
});

export const rangesNoLeasesInCrdbInternal = crdbInternal.table("ranges_no_leases", {
	rangeId: bigint("range_id", { mode: 'number' }).notNull(),
	startKey: customType({ dataType: () => 'bytea' })("start_key").notNull(),
	startPretty: text("start_pretty").notNull(),
	endKey: customType({ dataType: () => 'bytea' })("end_key").notNull(),
	endPretty: text("end_pretty").notNull(),
	replicas: bigint({ mode: 'number' }).array().notNull(),
	replicaLocalities: text("replica_localities").array().notNull(),
	votingReplicas: bigint("voting_replicas", { mode: 'number' }).array().notNull(),
	nonVotingReplicas: bigint("non_voting_replicas", { mode: 'number' }).array().notNull(),
	learnerReplicas: bigint("learner_replicas", { mode: 'number' }).array().notNull(),
	splitEnforcedUntil: timestamp("split_enforced_until"),
});

export const regionsInCrdbInternal = crdbInternal.table("regions", {
	region: text().notNull(),
	zones: text().array().notNull(),
});

export const schemaChangesInCrdbInternal = crdbInternal.table("schema_changes", {
	tableId: bigint("table_id", { mode: 'number' }).notNull(),
	parentId: bigint("parent_id", { mode: 'number' }).notNull(),
	name: text().notNull(),
	type: text().notNull(),
	targetId: bigint("target_id", { mode: 'number' }),
	targetName: text("target_name"),
	state: text().notNull(),
	direction: text().notNull(),
});

export const sessionTraceInCrdbInternal = crdbInternal.table("session_trace", {
	spanIdx: bigint("span_idx", { mode: 'number' }).notNull(),
	messageIdx: bigint("message_idx", { mode: 'number' }).notNull(),
	timestamp: timestamp({ withTimezone: true }).notNull(),
	duration: interval(),
	operation: text(),
	loc: text().notNull(),
	tag: text().notNull(),
	message: text().notNull(),
	age: interval().notNull(),
});

export const sessionVariablesInCrdbInternal = crdbInternal.table("session_variables", {
	variable: text().notNull(),
	value: text().notNull(),
	hidden: boolean().notNull(),
});

export const storeLivenessSupportForInCrdbInternal = crdbInternal.table("store_liveness_support_for", {
	nodeId: bigint("node_id", { mode: 'number' }).notNull(),
	storeId: bigint("store_id", { mode: 'number' }).notNull(),
	supportForNodeId: bigint("support_for_node_id", { mode: 'number' }).notNull(),
	supportForStoreId: bigint("support_for_store_id", { mode: 'number' }).notNull(),
	supportEpoch: bigint("support_epoch", { mode: 'number' }).notNull(),
	supportExpiration: timestamp("support_expiration").notNull(),
});

export const storeLivenessSupportFromInCrdbInternal = crdbInternal.table("store_liveness_support_from", {
	nodeId: bigint("node_id", { mode: 'number' }).notNull(),
	storeId: bigint("store_id", { mode: 'number' }).notNull(),
	supportFromNodeId: bigint("support_from_node_id", { mode: 'number' }).notNull(),
	supportFromStoreId: bigint("support_from_store_id", { mode: 'number' }).notNull(),
	supportEpoch: bigint("support_epoch", { mode: 'number' }).notNull(),
	supportExpiration: timestamp("support_expiration").notNull(),
});

export const superRegionsInCrdbInternal = crdbInternal.table("super_regions", {
	id: bigint({ mode: 'number' }).notNull(),
	databaseName: text("database_name").notNull(),
	superRegionName: text("super_region_name").notNull(),
	regions: text().array(),
});

export const tableColumnsInCrdbInternal = crdbInternal.table("table_columns", {
	descriptorId: bigint("descriptor_id", { mode: 'number' }),
	descriptorName: text("descriptor_name").notNull(),
	columnId: bigint("column_id", { mode: 'number' }).notNull(),
	columnName: text("column_name").notNull(),
	columnType: text("column_type").notNull(),
	nullable: boolean().notNull(),
	defaultExpr: text("default_expr"),
	hidden: boolean().notNull(),
});

export const tableIndexesInCrdbInternal = crdbInternal.table("table_indexes", {
	descriptorId: bigint("descriptor_id", { mode: 'number' }),
	descriptorName: text("descriptor_name").notNull(),
	indexId: bigint("index_id", { mode: 'number' }).notNull(),
	indexName: text("index_name").notNull(),
	indexType: text("index_type").notNull(),
	isUnique: boolean("is_unique").notNull(),
	isInverted: boolean("is_inverted").notNull(),
	isSharded: boolean("is_sharded").notNull(),
	isVisible: boolean("is_visible").notNull(),
	visibility: doublePrecision().notNull(),
	shardBucketCount: bigint("shard_bucket_count", { mode: 'number' }),
	createdAt: timestamp("created_at"),
	createStatement: text("create_statement").notNull(),
});

export const tableRowStatisticsInCrdbInternal = crdbInternal.table("table_row_statistics", {
	tableId: bigint("table_id", { mode: 'number' }).notNull(),
	tableName: text("table_name").notNull(),
	estimatedRowCount: bigint("estimated_row_count", { mode: 'number' }),
});

export const tableSpansInCrdbInternal = crdbInternal.table("table_spans", {
	descriptorId: bigint("descriptor_id", { mode: 'number' }).notNull(),
	startKey: customType({ dataType: () => 'bytea' })("start_key").notNull(),
	endKey: customType({ dataType: () => 'bytea' })("end_key").notNull(),
	dropped: boolean().notNull(),
});

export const tablesInCrdbInternal = crdbInternal.table("tables", {
	tableId: bigint("table_id", { mode: 'number' }).notNull(),
	parentId: bigint("parent_id", { mode: 'number' }).notNull(),
	name: text().notNull(),
	databaseName: text("database_name"),
	version: bigint({ mode: 'number' }).notNull(),
	modTime: timestamp("mod_time").notNull(),
	modTimeLogical: numeric("mod_time_logical").notNull(),
	formatVersion: text("format_version").notNull(),
	state: text().notNull(),
	scLeaseNodeId: bigint("sc_lease_node_id", { mode: 'number' }),
	scLeaseExpirationTime: timestamp("sc_lease_expiration_time"),
	dropTime: timestamp("drop_time"),
	auditMode: text("audit_mode").notNull(),
	schemaName: text("schema_name").notNull(),
	parentSchemaId: bigint("parent_schema_id", { mode: 'number' }).notNull(),
	locality: text(),
});

export const transactionContentionEventsInCrdbInternal = crdbInternal.table("transaction_contention_events", {
	collectionTs: timestamp("collection_ts", { withTimezone: true }).notNull(),
	blockingTxnId: uuid("blocking_txn_id").notNull(),
	blockingTxnFingerprintId: customType({ dataType: () => 'bytea' })("blocking_txn_fingerprint_id").notNull(),
	waitingTxnId: uuid("waiting_txn_id").notNull(),
	waitingTxnFingerprintId: customType({ dataType: () => 'bytea' })("waiting_txn_fingerprint_id").notNull(),
	contentionDuration: interval("contention_duration").notNull(),
	contendingKey: customType({ dataType: () => 'bytea' })("contending_key").notNull(),
	contendingPrettyKey: text("contending_pretty_key").notNull(),
	waitingStmtId: text("waiting_stmt_id").notNull(),
	waitingStmtFingerprintId: customType({ dataType: () => 'bytea' })("waiting_stmt_fingerprint_id").notNull(),
	databaseName: text("database_name").notNull(),
	schemaName: text("schema_name").notNull(),
	tableName: text("table_name").notNull(),
	indexName: text("index_name"),
	contentionType: text("contention_type").notNull(),
});

export const zonesInCrdbInternal = crdbInternal.table("zones", {
	zoneId: bigint("zone_id", { mode: 'number' }).notNull(),
	subzoneId: bigint("subzone_id", { mode: 'number' }).notNull(),
	target: text(),
	rangeName: text("range_name"),
	databaseName: text("database_name"),
	schemaName: text("schema_name"),
	tableName: text("table_name"),
	indexName: text("index_name"),
	partitionName: text("partition_name"),
	rawConfigYaml: text("raw_config_yaml").notNull(),
	rawConfigSql: text("raw_config_sql"),
	rawConfigProtobuf: customType({ dataType: () => 'bytea' })("raw_config_protobuf").notNull(),
	fullConfigYaml: text("full_config_yaml").notNull(),
	fullConfigSql: text("full_config_sql"),
});

export const geographyColumnsInPgExtension = pgExtension.table("geography_columns", {
	fTableCatalog: customType({ dataType: () => 'name' })("f_table_catalog"),
	fTableSchema: customType({ dataType: () => 'name' })("f_table_schema"),
	fTableName: customType({ dataType: () => 'name' })("f_table_name"),
	fGeographyColumn: customType({ dataType: () => 'name' })("f_geography_column"),
	coordDimension: bigint("coord_dimension", { mode: 'number' }),
	srid: bigint({ mode: 'number' }),
	type: text(),
});

export const geometryColumnsInPgExtension = pgExtension.table("geometry_columns", {
	fTableCatalog: customType({ dataType: () => 'name' })("f_table_catalog"),
	fTableSchema: customType({ dataType: () => 'name' })("f_table_schema"),
	fTableName: customType({ dataType: () => 'name' })("f_table_name"),
	fGeometryColumn: customType({ dataType: () => 'name' })("f_geometry_column"),
	coordDimension: bigint("coord_dimension", { mode: 'number' }),
	srid: bigint({ mode: 'number' }),
	type: text(),
});

export const spatialRefSysInPgExtension = pgExtension.table("spatial_ref_sys", {
	srid: bigint({ mode: 'number' }),
	authName: varchar("auth_name", { length: 256 }),
	authSrid: bigint("auth_srid", { mode: 'number' }),
	srtext: varchar({ length: 2048 }),
	proj4text: varchar({ length: 2048 }),
});

export const users = pgTable("users", {
	id: integer().default(nextval('public.users_id_seq'::REGCLASS)).primaryKey().generatedAlwaysAsIdentity(),
	name: varchar({ length: 255 }).notNull(),
	age: integer().notNull(),
	email: varchar({ length: 255 }).notNull(),
}, (table) => [
	unique("users_email_key").on(table.email),]);
export const clusterContendedIndexesInCrdbInternal = crdbInternal.view("cluster_contended_indexes", {	databaseName: text("database_name"),
	schemaName: text("schema_name"),
	tableName: text("table_name"),
	indexName: text("index_name"),
	numContentionEvents: bigint("num_contention_events", { mode: 'number' }),
}).as(sql`null`);

export const clusterContendedKeysInCrdbInternal = crdbInternal.view("cluster_contended_keys", {	databaseName: text("database_name"),
	schemaName: text("schema_name"),
	tableName: text("table_name"),
	indexName: text("index_name"),
	key: customType({ dataType: () => 'bytea' })(),
	numContentionEvents: bigint("num_contention_events", { mode: 'number' }),
}).as(sql`null`);

export const clusterContendedTablesInCrdbInternal = crdbInternal.view("cluster_contended_tables", {	databaseName: text("database_name"),
	schemaName: text("schema_name"),
	tableName: text("table_name"),
	numContentionEvents: bigint("num_contention_events", { mode: 'number' }),
}).as(sql`null`);

export const clusterInspectErrorsInCrdbInternal = crdbInternal.view("cluster_inspect_errors", {	errorId: uuid("error_id"),
	jobId: bigint("job_id", { mode: 'number' }),
	errorType: text("error_type"),
	aost: timestamp({ withTimezone: true }),
	databaseId: customType({ dataType: () => 'oid' })("database_id"),
	schemaId: customType({ dataType: () => 'oid' })("schema_id"),
	id: customType({ dataType: () => 'oid' })(),
	primaryKey: text("primary_key"),
	details: jsonb(),
	crdbInternalExpiration: timestamp("crdb_internal_expiration", { withTimezone: true }),
}).as(sql`null`);

export const clusterReplicationSpansInCrdbInternal = crdbInternal.view("cluster_replication_spans", {	jobId: bigint("job_id", { mode: 'number' }),
	startKey: text("start_key"),
	endKey: text("end_key"),
	resolved: numeric(),
	resolvedAge: interval("resolved_age"),
}).as(sql`null`);

export const fullyQualifiedNamesInCrdbInternal = crdbInternal.view("fully_qualified_names", {	objectId: bigint("object_id", { mode: 'number' }),
	schemaId: bigint("schema_id", { mode: 'number' }),
	databaseId: bigint("database_id", { mode: 'number' }),
	objectName: text("object_name"),
	schemaName: text("schema_name"),
	databaseName: text("database_name"),
	fqName: text("fq_name"),
}).as(sql`null`);

export const jobsInCrdbInternal = crdbInternal.view("jobs", {	jobId: bigint("job_id", { mode: 'number' }),
	jobType: text("job_type"),
	description: text(),
	statement: text(),
	userName: text("user_name"),
	status: text(),
	runningStatus: text("running_status"),
	created: timestamp({ withTimezone: true }),
	finished: timestamp({ withTimezone: true }),
	modified: timestamp({ withTimezone: true }),
	fractionCompleted: doublePrecision("fraction_completed"),
	highWaterTimestamp: numeric("high_water_timestamp"),
	error: text(),
	coordinatorId: bigint("coordinator_id", { mode: 'number' }),
}).as(sql`null`);

export const kvDroppedRelationsInCrdbInternal = crdbInternal.view("kv_dropped_relations", {	parentId: bigint("parent_id", { mode: 'number' }),
	parentSchemaId: bigint("parent_schema_id", { mode: 'number' }),
	name: text(),
	id: bigint({ mode: 'number' }),
	dropTime: timestamp("drop_time"),
	ttl: interval(),
}).as(sql`null`);

export const kvRepairableCatalogCorruptionsInCrdbInternal = crdbInternal.view("kv_repairable_catalog_corruptions", {	parentId: bigint("parent_id", { mode: 'number' }),
	parentSchemaId: bigint("parent_schema_id", { mode: 'number' }),
	name: text(),
	id: bigint({ mode: 'number' }),
	corruption: text(),
}).as(sql`null`);

export const kvSessionBasedLeasesInCrdbInternal = crdbInternal.view("kv_session_based_leases", {	descId: bigint("desc_id", { mode: 'number' }),
	version: bigint({ mode: 'number' }),
	sqlInstanceId: bigint("sql_instance_id", { mode: 'number' }),
	sessionId: customType({ dataType: () => 'bytea' })("session_id"),
	crdbRegion: customType({ dataType: () => 'bytea' })("crdb_region"),
}).as(sql`null`);

export const kvSystemPrivilegesInCrdbInternal = crdbInternal.view("kv_system_privileges", {	username: text(),
	path: text(),
	privileges: text().array().array("[][]"),
	grantOptions: text("grant_options").array().array("[][]"),
	userId: customType({ dataType: () => 'oid' })("user_id"),
}).as(sql`null`);

export const logicalReplicationSpansInCrdbInternal = crdbInternal.view("logical_replication_spans", {	jobId: bigint("job_id", { mode: 'number' }),
	startKey: text("start_key"),
	endKey: text("end_key"),
	resolved: numeric(),
	resolvedAge: interval("resolved_age"),
}).as(sql`null`);

export const rangesInCrdbInternal = crdbInternal.view("ranges", {	rangeId: bigint("range_id", { mode: 'number' }),
	startKey: customType({ dataType: () => 'bytea' })("start_key"),
	startPretty: text("start_pretty"),
	endKey: customType({ dataType: () => 'bytea' })("end_key"),
	endPretty: text("end_pretty"),
	replicas: bigint({ mode: 'number' }).array().array("[][]"),
	replicaLocalities: text("replica_localities").array().array("[][]"),
	votingReplicas: bigint("voting_replicas", { mode: 'number' }).array().array("[][]"),
	nonVotingReplicas: bigint("non_voting_replicas", { mode: 'number' }).array().array("[][]"),
	learnerReplicas: bigint("learner_replicas", { mode: 'number' }).array().array("[][]"),
	splitEnforcedUntil: timestamp("split_enforced_until"),
	leaseHolder: bigint("lease_holder", { mode: 'number' }),
	rangeSize: bigint("range_size", { mode: 'number' }),
	errors: text(),
}).as(sql`null`);

export const statementActivityInCrdbInternal = crdbInternal.view("statement_activity", {	aggregatedTs: timestamp("aggregated_ts", { withTimezone: true }),
	fingerprintId: customType({ dataType: () => 'bytea' })("fingerprint_id"),
	transactionFingerprintId: customType({ dataType: () => 'bytea' })("transaction_fingerprint_id"),
	planHash: customType({ dataType: () => 'bytea' })("plan_hash"),
	appName: text("app_name"),
	aggInterval: interval("agg_interval"),
	metadata: jsonb(),
	statistics: jsonb(),
	plan: jsonb(),
	indexRecommendations: text("index_recommendations").array().array("[][]"),
	executionCount: bigint("execution_count", { mode: 'number' }),
	executionTotalSeconds: doublePrecision("execution_total_seconds"),
	executionTotalClusterSeconds: doublePrecision("execution_total_cluster_seconds"),
	contentionTimeAvgSeconds: doublePrecision("contention_time_avg_seconds"),
	cpuSqlAvgNanos: doublePrecision("cpu_sql_avg_nanos"),
	serviceLatencyAvgSeconds: doublePrecision("service_latency_avg_seconds"),
	serviceLatencyP99Seconds: doublePrecision("service_latency_p99_seconds"),
}).as(sql`null`);

export const statementStatisticsInCrdbInternal = crdbInternal.view("statement_statistics", {	aggregatedTs: timestamp("aggregated_ts", { withTimezone: true }),
	fingerprintId: customType({ dataType: () => 'bytea' })("fingerprint_id"),
	transactionFingerprintId: customType({ dataType: () => 'bytea' })("transaction_fingerprint_id"),
	planHash: customType({ dataType: () => 'bytea' })("plan_hash"),
	appName: text("app_name"),
	metadata: jsonb(),
	statistics: jsonb(),
	sampledPlan: jsonb("sampled_plan"),
	aggregationInterval: interval("aggregation_interval"),
	indexRecommendations: text("index_recommendations").array().array("[][]"),
}).as(sql`null`);

export const statementStatisticsPersistedInCrdbInternal = crdbInternal.view("statement_statistics_persisted", {	aggregatedTs: timestamp("aggregated_ts", { withTimezone: true }),
	fingerprintId: customType({ dataType: () => 'bytea' })("fingerprint_id"),
	transactionFingerprintId: customType({ dataType: () => 'bytea' })("transaction_fingerprint_id"),
	planHash: customType({ dataType: () => 'bytea' })("plan_hash"),
	appName: text("app_name"),
	nodeId: bigint("node_id", { mode: 'number' }),
	aggInterval: interval("agg_interval"),
	metadata: jsonb(),
	statistics: jsonb(),
	plan: jsonb(),
	indexRecommendations: text("index_recommendations").array().array("[][]"),
	indexesUsage: jsonb("indexes_usage"),
	executionCount: bigint("execution_count", { mode: 'number' }),
	serviceLatency: doublePrecision("service_latency"),
	cpuSqlNanos: doublePrecision("cpu_sql_nanos"),
	contentionTime: doublePrecision("contention_time"),
	totalEstimatedExecutionTime: doublePrecision("total_estimated_execution_time"),
	p99Latency: doublePrecision("p99_latency"),
}).as(sql`null`);

export const statementStatisticsPersistedV222InCrdbInternal = crdbInternal.view("statement_statistics_persisted_v22_2", {	aggregatedTs: timestamp("aggregated_ts", { withTimezone: true }),
	fingerprintId: customType({ dataType: () => 'bytea' })("fingerprint_id"),
	transactionFingerprintId: customType({ dataType: () => 'bytea' })("transaction_fingerprint_id"),
	planHash: customType({ dataType: () => 'bytea' })("plan_hash"),
	appName: text("app_name"),
	nodeId: bigint("node_id", { mode: 'number' }),
	aggInterval: interval("agg_interval"),
	metadata: jsonb(),
	statistics: jsonb(),
	plan: jsonb(),
	indexRecommendations: text("index_recommendations").array().array("[][]"),
}).as(sql`null`);

export const systemJobsInCrdbInternal = crdbInternal.view("system_jobs", {	id: bigint({ mode: 'number' }),
	status: text(),
	created: timestamp({ withTimezone: true }),
	payload: customType({ dataType: () => 'bytea' })(),
	progress: customType({ dataType: () => 'bytea' })(),
	createdByType: text("created_by_type"),
	createdById: bigint("created_by_id", { mode: 'number' }),
	claimSessionId: bigint("claim_session_id", { mode: 'number' }),
	claimInstanceId: bigint("claim_instance_id", { mode: 'number' }),
	numRuns: bigint("num_runs", { mode: 'number' }),
	lastRun: timestamp("last_run", { withTimezone: true }),
	jobType: text("job_type"),
}).as(sql`null`);

export const tenantUsageDetailsInCrdbInternal = crdbInternal.view("tenant_usage_details", {	tenantId: bigint("tenant_id", { mode: 'number' }),
	totalRu: doublePrecision("total_ru"),
	totalReadBytes: bigint("total_read_bytes", { mode: 'number' }),
	totalReadRequests: bigint("total_read_requests", { mode: 'number' }),
	totalWriteBytes: bigint("total_write_bytes", { mode: 'number' }),
	totalWriteRequests: bigint("total_write_requests", { mode: 'number' }),
	totalSqlPodSeconds: doublePrecision("total_sql_pod_seconds"),
	totalPgwireEgressBytes: bigint("total_pgwire_egress_bytes", { mode: 'number' }),
	totalExternalIoIngressBytes: bigint("total_external_io_ingress_bytes", { mode: 'number' }),
	totalExternalIoEgressBytes: bigint("total_external_io_egress_bytes", { mode: 'number' }),
	totalKvRu: doublePrecision("total_kv_ru"),
	totalCrossRegionNetworkRu: doublePrecision("total_cross_region_network_ru"),
}).as(sql`null`);

export const transactionActivityInCrdbInternal = crdbInternal.view("transaction_activity", {	aggregatedTs: timestamp("aggregated_ts", { withTimezone: true }),
	fingerprintId: customType({ dataType: () => 'bytea' })("fingerprint_id"),
	appName: text("app_name"),
	aggInterval: interval("agg_interval"),
	metadata: jsonb(),
	statistics: jsonb(),
	query: text(),
	executionCount: bigint("execution_count", { mode: 'number' }),
	executionTotalSeconds: doublePrecision("execution_total_seconds"),
	executionTotalClusterSeconds: doublePrecision("execution_total_cluster_seconds"),
	contentionTimeAvgSeconds: doublePrecision("contention_time_avg_seconds"),
	cpuSqlAvgNanos: doublePrecision("cpu_sql_avg_nanos"),
	serviceLatencyAvgSeconds: doublePrecision("service_latency_avg_seconds"),
	serviceLatencyP99Seconds: doublePrecision("service_latency_p99_seconds"),
}).as(sql`null`);

export const transactionStatisticsInCrdbInternal = crdbInternal.view("transaction_statistics", {	aggregatedTs: timestamp("aggregated_ts", { withTimezone: true }),
	fingerprintId: customType({ dataType: () => 'bytea' })("fingerprint_id"),
	appName: text("app_name"),
	metadata: jsonb(),
	statistics: jsonb(),
	aggregationInterval: interval("aggregation_interval"),
}).as(sql`null`);

export const transactionStatisticsPersistedInCrdbInternal = crdbInternal.view("transaction_statistics_persisted", {	aggregatedTs: timestamp("aggregated_ts", { withTimezone: true }),
	fingerprintId: customType({ dataType: () => 'bytea' })("fingerprint_id"),
	appName: text("app_name"),
	nodeId: bigint("node_id", { mode: 'number' }),
	aggInterval: interval("agg_interval"),
	metadata: jsonb(),
	statistics: jsonb(),
	executionCount: bigint("execution_count", { mode: 'number' }),
	serviceLatency: doublePrecision("service_latency"),
	cpuSqlNanos: doublePrecision("cpu_sql_nanos"),
	contentionTime: doublePrecision("contention_time"),
	totalEstimatedExecutionTime: doublePrecision("total_estimated_execution_time"),
	p99Latency: doublePrecision("p99_latency"),
}).as(sql`null`);

export const transactionStatisticsPersistedV222InCrdbInternal = crdbInternal.view("transaction_statistics_persisted_v22_2", {	aggregatedTs: timestamp("aggregated_ts", { withTimezone: true }),
	fingerprintId: customType({ dataType: () => 'bytea' })("fingerprint_id"),
	appName: text("app_name"),
	nodeId: bigint("node_id", { mode: 'number' }),
	aggInterval: interval("agg_interval"),
	metadata: jsonb(),
	statistics: jsonb(),
}).as(sql`null`);