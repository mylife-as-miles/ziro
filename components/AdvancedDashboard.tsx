"use client";

import { useState, useEffect, useRef } from 'react';
import { 
  Search, Zap, Shield, Target, Brain, Activity, Clock, 
  CheckCircle, AlertCircle, ArrowRight, Download, Copy, 
  ExternalLink, Play, Pause, RefreshCw, Eye, EyeOff,
  Terminal, Code, Database, Globe, Cpu
} from 'lucide-react';

interface ApiEndpoint {
  method: string;
  url: string;
  status: number;
  size: number;
  timestamp?: string;
  responseTime?: number;
  security?: 'secure' | 'warning' | 'critical';
}

interface CrawlResult {
  endpoints: ApiEndpoint[];
  postmanCollection: any;
  crawlId: string;
  metadata?: {
    totalRequests: number;
    uniqueEndpoints: number;
    crawlDuration: number;
    securityScore: number;
    coverage: number;
  };
}

interface DashboardProps {
  className?: string;
}

export default function AdvancedDashboard({ className = "" }: DashboardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<CrawlResult | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [url, setUrl] = useState('https://api.github.com');
  const [activeTab, setActiveTab] = useState<'overview' | 'endpoints' | 'security' | 'export'>('overview');
  const [selectedEndpoint, setSelectedEndpoint] = useState<ApiEndpoint | null>(null);
  const [showLogs, setShowLogs] = useState(false);
  const [isRealTime, setIsRealTime] = useState(true);
  const logsRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logs
  useEffect(() => {
    if (logsRef.current && isRealTime) {
      logsRef.current.scrollTop = logsRef.current.scrollHeight;
    }
  }, [logs, isRealTime]);

  // Simulate enhanced crawl process
  const handleCrawl = async () => {
    setIsLoading(true);
    setProgress(0);
    setResult(null);
    setLogs([]);
    setError(null);
    setSelectedEndpoint(null);

    const phases = [
      { name: 'Initializing AI Engine', duration: 800 },
      { name: 'Establishing Stealth Connection', duration: 1200 },
      { name: 'Analyzing Target Architecture', duration: 1000 },
      { name: 'Discovering Hidden Endpoints', duration: 2000 },
      { name: 'Security Assessment', duration: 1500 },
      { name: 'Generating Intelligence Report', duration: 800 }
    ];

    let currentProgress = 0;
    
    for (let i = 0; i < phases.length; i++) {
      const phase = phases[i];
      setLogs(prev => [...prev, `🔄 ${phase.name}...`]);
      
      await new Promise(resolve => setTimeout(resolve, phase.duration));
      
      currentProgress = ((i + 1) / phases.length) * 100;
      setProgress(currentProgress);
      
      // Add some dynamic logs during discovery phase
      if (i === 3) {
        const endpoints = [
          'GET /api/users → 200',
          'POST /api/auth/login → 401',
          'GET /api/repos → 200',
          'PUT /api/settings → 403',
          'DELETE /api/admin → 404'
        ];
        
        for (const endpoint of endpoints) {
          await new Promise(resolve => setTimeout(resolve, 300));
          setLogs(prev => [...prev, `📡 Discovered: ${endpoint}`]);
        }
      }
      
      setLogs(prev => [...prev, `✅ ${phase.name} complete`]);
    }

    // Generate mock results
    const mockEndpoints: ApiEndpoint[] = [
      { method: 'GET', url: '/api/users', status: 200, size: 1024, responseTime: 234, security: 'secure', timestamp: new Date().toISOString() },
      { method: 'POST', url: '/api/auth/login', status: 401, size: 512, responseTime: 145, security: 'warning', timestamp: new Date().toISOString() },
      { method: 'GET', url: '/api/repos', status: 200, size: 2048, responseTime: 567, security: 'secure', timestamp: new Date().toISOString() },
      { method: 'PUT', url: '/api/settings', status: 403, size: 256, responseTime: 89, security: 'critical', timestamp: new Date().toISOString() },
      { method: 'DELETE', url: '/api/admin', status: 404, size: 128, responseTime: 67, security: 'warning', timestamp: new Date().toISOString() },
      { method: 'GET', url: '/api/analytics', status: 200, size: 4096, responseTime: 890, security: 'secure', timestamp: new Date().toISOString() },
      { method: 'POST', url: '/api/webhooks', status: 201, size: 1536, responseTime: 456, security: 'secure', timestamp: new Date().toISOString() }
    ];

    const mockResult: CrawlResult = {
      endpoints: mockEndpoints,
      crawlId: 'crawl_' + Date.now(),
      postmanCollection: { info: { name: 'Discovered APIs' } },
      metadata: {
        totalRequests: 47,
        uniqueEndpoints: mockEndpoints.length,
        crawlDuration: 8.5,
        securityScore: 78,
        coverage: 94
      }
    };

    setResult(mockResult);
    setIsLoading(false);
    setLogs(prev => [...prev, `🎉 Discovery complete! Found ${mockEndpoints.length} endpoints`]);
  };

  const getSecurityColor = (security?: string) => {
    switch (security) {
      case 'secure': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'critical': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return 'text-green-400';
    if (status >= 300 && status < 400) return 'text-blue-400';
    if (status >= 400 && status < 500) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className={`bg-black min-h-screen text-white ${className}`}>
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 border-b border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-black" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Ziro <span className="text-yellow-400">Pro</span>
                </h1>
                <p className="text-sm text-gray-400">Advanced API Discovery Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>System Operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Control Panel */}
            <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                  <Target className="w-5 h-5 text-yellow-400" />
                  <span>Target Configuration</span>
                </h2>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => setShowLogs(!showLogs)}
                    className={`p-2 rounded-lg transition-colors ${showLogs ? 'bg-yellow-400 text-black' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                  >
                    <Terminal className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setIsRealTime(!isRealTime)}
                    className={`p-2 rounded-lg transition-colors ${isRealTime ? 'bg-green-400 text-black' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                  >
                    {isRealTime ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter target URL (e.g., https://api.example.com)"
                    className="w-full pl-12 pr-4 py-4 bg-black border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none transition-colors"
                    disabled={isLoading}
                  />
                </div>

                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleCrawl}
                    disabled={isLoading || !url}
                    className={`flex-1 py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ${
                      isLoading 
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:scale-105 hover:shadow-lg'
                    }`}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        <span>Analyzing...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <Zap className="w-5 h-5" />
                        <span>Start Discovery</span>
                      </div>
                    )}
                  </button>

                  {result && (
                    <button className="px-6 py-4 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors">
                      <Download className="w-5 h-5" />
                    </button>
                  )}
                </div>

                {/* Progress Bar */}
                {isLoading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>Discovery Progress</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-2 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Results Panel */}
            {result && (
              <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl overflow-hidden">
                {/* Tabs */}
                <div className="border-b border-gray-800">
                  <div className="flex">
                    {[
                      { id: 'overview', label: 'Overview', icon: Activity },
                      { id: 'endpoints', label: 'Endpoints', icon: Globe },
                      { id: 'security', label: 'Security', icon: Shield },
                      { id: 'export', label: 'Export', icon: Download }
                    ].map((tab) => {
                      const Icon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id as any)}
                          className={`flex-1 px-6 py-4 text-sm font-medium transition-colors border-b-2 ${
                            activeTab === tab.id
                              ? 'text-yellow-400 border-yellow-400 bg-yellow-400/10'
                              : 'text-gray-400 border-transparent hover:text-gray-300'
                          }`}
                        >
                          <div className="flex items-center justify-center space-x-2">
                            <Icon className="w-4 h-4" />
                            <span>{tab.label}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="p-6">
                  {/* Overview Tab */}
                  {activeTab === 'overview' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                          { label: 'Endpoints Found', value: result.metadata?.uniqueEndpoints || 0, color: 'text-yellow-400', icon: Target },
                          { label: 'Security Score', value: `${result.metadata?.securityScore || 0}%`, color: 'text-green-400', icon: Shield },
                          { label: 'Coverage', value: `${result.metadata?.coverage || 0}%`, color: 'text-blue-400', icon: Activity },
                          { label: 'Duration', value: `${result.metadata?.crawlDuration || 0}s`, color: 'text-purple-400', icon: Clock }
                        ].map((stat, index) => {
                          const Icon = stat.icon;
                          return (
                            <div key={index} className="bg-black/50 rounded-xl p-4 border border-gray-800">
                              <div className="flex items-center justify-between mb-2">
                                <Icon className={`w-5 h-5 ${stat.color}`} />
                                <span className={`text-2xl font-bold ${stat.color}`}>{stat.value}</span>
                              </div>
                              <p className="text-sm text-gray-400">{stat.label}</p>
                            </div>
                          );
                        })}
                      </div>

                      <div className="bg-black/50 rounded-xl p-4 border border-gray-800">
                        <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <span>Discovery Summary</span>
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-400 mb-2">Endpoint Distribution</p>
                            <div className="space-y-1">
                              {Object.entries(
                                result.endpoints.reduce((acc, ep) => {
                                  acc[ep.method] = (acc[ep.method] || 0) + 1;
                                  return acc;
                                }, {} as Record<string, number>)
                              ).map(([method, count]) => (
                                <div key={method} className="flex justify-between">
                                  <span className="text-gray-300">{method}</span>
                                  <span className="text-yellow-400">{count}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-gray-400 mb-2">Security Analysis</p>
                            <div className="space-y-1">
                              {Object.entries(
                                result.endpoints.reduce((acc, ep) => {
                                  const security = ep.security || 'unknown';
                                  acc[security] = (acc[security] || 0) + 1;
                                  return acc;
                                }, {} as Record<string, number>)
                              ).map(([security, count]) => (
                                <div key={security} className="flex justify-between">
                                  <span className="text-gray-300 capitalize">{security}</span>
                                  <span className={getSecurityColor(security)}>{count}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Endpoints Tab */}
                  {activeTab === 'endpoints' && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">Discovered Endpoints</h3>
                        <span className="text-sm text-gray-400">{result.endpoints.length} total</span>
                      </div>
                      <div className="space-y-2 max-h-96 overflow-y-auto">
                        {result.endpoints.map((endpoint, index) => (
                          <div
                            key={index}
                            onClick={() => setSelectedEndpoint(endpoint)}
                            className={`p-4 rounded-lg border cursor-pointer transition-all ${
                              selectedEndpoint === endpoint
                                ? 'border-yellow-400 bg-yellow-400/10'
                                : 'border-gray-800 bg-black/30 hover:border-gray-700'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <span className={`px-2 py-1 text-xs font-medium rounded ${
                                  endpoint.method === 'GET' ? 'bg-green-900 text-green-300' :
                                  endpoint.method === 'POST' ? 'bg-blue-900 text-blue-300' :
                                  endpoint.method === 'PUT' ? 'bg-yellow-900 text-yellow-300' :
                                  endpoint.method === 'DELETE' ? 'bg-red-900 text-red-300' :
                                  'bg-gray-900 text-gray-300'
                                }`}>
                                  {endpoint.method}
                                </span>
                                <span className="text-white font-mono">{endpoint.url}</span>
                              </div>
                              <div className="flex items-center space-x-3 text-sm">
                                <span className={getStatusColor(endpoint.status)}>{endpoint.status}</span>
                                <span className="text-gray-400">{endpoint.responseTime}ms</span>
                                <span className={getSecurityColor(endpoint.security)}>
                                  {endpoint.security === 'secure' ? '🔒' : 
                                   endpoint.security === 'warning' ? '⚠️' : 
                                   endpoint.security === 'critical' ? '🚨' : '❓'}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Security Tab */}
                  {activeTab === 'security' && (
                    <div className="space-y-6">
                      <div className="text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 mb-4">
                          <span className="text-2xl font-bold text-white">{result.metadata?.securityScore}%</span>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">Security Assessment</h3>
                        <p className="text-gray-400">Overall security posture is good</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                          { label: 'Secure Endpoints', count: result.endpoints.filter(ep => ep.security === 'secure').length, color: 'green' },
                          { label: 'Warnings', count: result.endpoints.filter(ep => ep.security === 'warning').length, color: 'yellow' },
                          { label: 'Critical Issues', count: result.endpoints.filter(ep => ep.security === 'critical').length, color: 'red' }
                        ].map((item, index) => (
                          <div key={index} className="bg-black/50 rounded-xl p-4 border border-gray-800 text-center">
                            <div className={`text-2xl font-bold mb-2 ${
                              item.color === 'green' ? 'text-green-400' :
                              item.color === 'yellow' ? 'text-yellow-400' :
                              'text-red-400'
                            }`}>
                              {item.count}
                            </div>
                            <p className="text-sm text-gray-400">{item.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Export Tab */}
                  {activeTab === 'export' && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold">Export Options</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { title: 'Postman Collection', desc: 'Import directly into Postman', icon: Download, format: 'JSON' },
                          { title: 'OpenAPI Spec', desc: 'Generate OpenAPI 3.0 specification', icon: Code, format: 'YAML' },
                          { title: 'CSV Report', desc: 'Endpoint data in spreadsheet format', icon: Database, format: 'CSV' },
                          { title: 'Security Report', desc: 'Detailed security analysis', icon: Shield, format: 'PDF' }
                        ].map((option, index) => {
                          const Icon = option.icon;
                          return (
                            <button
                              key={index}
                              className="p-6 bg-black/50 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors text-left group"
                            >
                              <div className="flex items-start justify-between mb-4">
                                <Icon className="w-8 h-8 text-yellow-400 group-hover:scale-110 transition-transform" />
                                <span className="text-xs px-2 py-1 bg-gray-800 rounded text-gray-300">{option.format}</span>
                              </div>
                              <h4 className="text-white font-semibold mb-2">{option.title}</h4>
                              <p className="text-sm text-gray-400">{option.desc}</p>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Live Logs */}
            {showLogs && (
              <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                  <h3 className="font-semibold flex items-center space-x-2">
                    <Terminal className="w-4 h-4 text-green-400" />
                    <span>Live Console</span>
                  </h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-gray-400">Active</span>
                  </div>
                </div>
                <div 
                  ref={logsRef}
                  className="h-80 overflow-y-auto p-4 bg-black/50 font-mono text-sm space-y-1"
                >
                  {logs.length === 0 ? (
                    <p className="text-gray-500">Waiting for discovery to start...</p>
                  ) : (
                    logs.map((log, index) => (
                      <div key={index} className="text-gray-300 leading-relaxed">
                        <span className="text-gray-500 text-xs mr-2">
                          {new Date().toLocaleTimeString()}
                        </span>
                        {log}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6">
              <h3 className="font-semibold mb-4 flex items-center space-x-2">
                <Activity className="w-4 h-4 text-blue-400" />
                <span>System Status</span>
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'AI Engine', status: 'Operational', color: 'green' },
                  { label: 'Stealth Mode', status: 'Active', color: 'blue' },
                  { label: 'Security Scanner', status: 'Ready', color: 'yellow' },
                  { label: 'Export Service', status: 'Online', color: 'green' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">{item.label}</span>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        item.color === 'green' ? 'bg-green-400' :
                        item.color === 'blue' ? 'bg-blue-400' :
                        item.color === 'yellow' ? 'bg-yellow-400' :
                        'bg-gray-400'
                      }`}></div>
                      <span className="text-xs text-gray-300">{item.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Endpoint Details */}
            {selectedEndpoint && (
              <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6">
                <h3 className="font-semibold mb-4 flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-purple-400" />
                  <span>Endpoint Details</span>
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">METHOD</p>
                    <span className={`px-2 py-1 text-xs font-medium rounded ${
                      selectedEndpoint.method === 'GET' ? 'bg-green-900 text-green-300' :
                      selectedEndpoint.method === 'POST' ? 'bg-blue-900 text-blue-300' :
                      selectedEndpoint.method === 'PUT' ? 'bg-yellow-900 text-yellow-300' :
                      selectedEndpoint.method === 'DELETE' ? 'bg-red-900 text-red-300' :
                      'bg-gray-900 text-gray-300'
                    }`}>
                      {selectedEndpoint.method}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">URL</p>
                    <p className="text-sm font-mono text-white break-all">{selectedEndpoint.url}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-400 mb-1">STATUS</p>
                      <p className={`text-sm font-semibold ${getStatusColor(selectedEndpoint.status)}`}>
                        {selectedEndpoint.status}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">RESPONSE TIME</p>
                      <p className="text-sm text-white">{selectedEndpoint.responseTime}ms</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">SECURITY</p>
                    <div className="flex items-center space-x-2">
                      <span className={`capitalize ${getSecurityColor(selectedEndpoint.security)}`}>
                        {selectedEndpoint.security}
                      </span>
                      <span className={getSecurityColor(selectedEndpoint.security)}>
                        {selectedEndpoint.security === 'secure' ? '🔒' : 
                         selectedEndpoint.security === 'warning' ? '⚠️' : 
                         selectedEndpoint.security === 'critical' ? '🚨' : '❓'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
