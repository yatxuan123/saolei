function _am8(r, q) {
	for (var s = 0; s < 8; s++) {
		var p = r + CY[s];
		var o = q + CX[s];
		if (p >= 0 && p < Y && o >= 0 && o < X) {
			d31[p][o][2]++
		}
	}
}
function $(a) {
	return document['getElementById'](a)
}

var d31 = [];
var X, Y, M;
var CX = [ - 1, -1, -1, 0, 0, 1, 1, 1];
var CY = [ - 1, 0, 1, -1, 1, -1, 0, 1];
var _gs;
function S98(k, l) {
	ctx['drawImage'](gfb[0], k * 25, l * 25);
	setTimeout(function() {
		if (d31[l][k][0] == 0) {
			ctx['drawImage'](gfs[0], k * 25, l * 25)
		}
	},
	120)
}
function c67(k, l) {
	var B = d31[l][k];
	if (B[0] != 1) {
		return
	};
	var D = 0,
	E = 0;
	for (var s = 0; s < 8; s++) {
		var p = l + CY[s];
		var o = k + CX[s];
		if (p >= 0 && p < Y && o >= 0 && o < X) {
			var C = d31[p][o];
			if (C[0] == 2) {
				D++
			} else {
				if (C[0] == 0) {
					if (C[1] == 1) {
						E++
					}
				}
			}
		}
	};
	var F = D >= B[2];
	if (F && E) {
		f17()
	} else {
		for (var s = 0; s < 8; s++) {
			var p = l + CY[s];
			var o = k + CX[s];
			if (p >= 0 && p < Y && o >= 0 && o < X) {
				if (d31[p][o][0] == 0) {
					if (F) {
						o0o(o, p)
					} else {
						S98(o, p)
					}
				}
			}
		}
	}
}
function f17() {
	_edn();
	$('face')['src'] = gif[2];
	_gs = 3;
	var k, l;
	for (l = 0; l < Y; l++) {
		for (k = 0; k < X; k++) {
			if (d31[l][k][0] == 0) {
				if (d31[l][k][1] == 1) {
					ctx['drawImage'](gfs[3], k * 25, l * 25)
				} else {}
			} else {
				if (d31[l][k][0] == 2) {
					if (d31[l][k][1] == 0) {
						h_f[f_n++] = setInterval(function(k, l) {
							var N = 0;
							return function() {
								ctx['drawImage'](N == 0 ? gfb[d31[l][k][2]] : gfs[1], k * 25, l * 25);
								N = !N
							}
						} (k, l), 800)
					} else {}
				}
			}
		}
	}
}
function o0o(k, l) {
	d31[l][k][0] = 1;
	if (d31[l][k][1] == 1) {
		ctx['drawImage'](gfs[2], k * 25, l * 25);
		f17()
	} else {
		ctx['drawImage'](gfb[d31[l][k][2]], k * 25, l * 25);
		RB--;
		if (RB == 0) {
			scs()
		} else {
			if (d31[l][k][2] == 0) {
				for (var s = 0; s < 8; s++) {
					var p = l + CY[s];
					var o = k + CX[s];
					if (p >= 0 && p < Y && o >= 0 && o < X) {
						if (d31[p][o][0] == 0) {
							o0o(o, p)
						}
					}
				}
			}
		}
	}
}
function scs() {
	_gs = 2;
	_edn();
	var k, l;
	for (l = 0; l < Y; l++) {
		for (k = 0; k < X; k++) {
			if (d31[l][k][0] == 0) {
				if (d31[l][k][1] != 1) {
					alert('bug 1')
				};
				ctx['drawImage'](gfs[1], k * 25, l * 25);
				d31[l][k][0] = 2;
				RM--
			}
		}
	};
	if (RM != 0) {
		alert('bug 2')
	};
	crm(0);
	$('face')['src'] = gif[1];
	up()
}
var _v;
function up() {
	if (_v > 3 && _t0 < 10) {
		return
	};
	var Z = un();
	if (Z == null) {
		getuid();
		return
	};
	var ba = _v + '\x1E' + Z + '\x1F' + _t0;
	if (_v > 3) {
		ba += '\x1F' + X + '\x1F' + Y + '\x1F' + M
	};
}
function DS(G) {
	var H = $(G);
	var J = H['getContext']('2d');
	var I = 3;
	return function(L) {
		if (L < 10) {
			L = '00' + L
		} else {
			if (L < 100) {
				L = '0' + L
			} else {
				L = L['toString']()
			}
		};
		var K = L['length'];
		if (K != I) {
			H['width'] = K * 13;
			I = K
		};
		for (var f = 0; f < K; f++) {
			J['drawImage'](gfd[parseInt(L['charAt'](f))], f * 13, 0)
		}
	}
}
function _gnt() {
	for (var l = 0; l < Y; l++) {
		d31[l] = [];
		for (var k = 0; k < X; k++) {
			d31[l][k] = [0, 0, 0]
		}
	};
	for (var w = 0; w < M; w++) {
		do {
			rx = _r39(X);
			ry = _r39(Y)
		} while ( d31 [ ry ][rx][1] == 1);;
		d31[ry][rx][1] = 1;
		_am8(ry, rx)
	};
	RM = M;
	RB = X * Y - M
}
var h_f = [];
var f_n = 0;
function _45() {
	if (he > 0) {
		clearInterval(he);
		he = 0
	};
	for (var f = 0; f < f_n; f++) {
		clearInterval(h_f[f])
	};
	f_n = 0;
	_gnt();
	_d46();
	_x0 = -1;
	_y0 = -1;
	sopen();
	_gs = 0
}
var _mp1, _mp2;
var paf = $('paf');
var ctx = paf['getContext']('2d');
var crm = DS('rm');
var ces = DS('es');
var _x0;
var _y0;
function _65(g) {
	if (_tch || _gs > 1) {
		return
	};
	var h = paf['getBoundingClientRect']();
	var k = Math['floor']((g['clientX'] - h['left']) / 25);
	var l = Math['floor']((g['clientY'] - h['top']) / 25);
	_x0 = k;
	_y0 = l;
	var j = d31[l][k][0];
	if (_gs == 0) {
		_es()
	};
	if (g['button'] == 2) {
		if (_mp2 != 1) {
			if (j == 1) {
				c67(k, l)
			} else {
				M5k(k, l)
			}
		}
	} else {
		if (_mp1 != 1) {
			if (j == 1) {
				c67(k, l)
			} else {
				if (j == 2) {
					M5k(k, l)
				} else {
					o0o(k, l)
				}
			}
		}
	}
}
function _67(g) {
	if (_tch || _gs > 1) {
		return
	};
	var h = paf['getBoundingClientRect']();
	var k = Math['floor']((g['clientX'] - h['left']) / 25);
	var l = Math['floor']((g['clientY'] - h['top']) / 25);
	var j = d31[l][k][0];
	if (g['button'] == 2) {
		if (_mp2 != null) {
			if (_mp2 == 2 && k == _x0 && l == _y0) {
				return
			};
			if (j == 1) {
				c67(k, l)
			} else {
				M5k(k, l)
			}
		}
	} else {
		if (_mp1 != null) {
			if (_mp1 == 2 && k == _x0 && l == _y0) {
				return
			};
			if (j == 1) {
				c67(k, l)
			} else {
				if (j == 2) {
					M5k(k, l)
				} else {
					o0o(k, l)
				}
			}
		}
	}
}
function _77(g) {
	if (_gs > 1) {
		return
	};
	_tch = 1;
	var h = paf['getBoundingClientRect']();
	var k = Math['floor']((g['touches'][0]['clientX'] - h['left']) / 25);
	var l = Math['floor']((g['touches'][0]['clientY'] - h['top']) / 25);
	if (d31[l][k][0] == 1) {
		c67(k, l)
	} else {
		_hl = setTimeout(function() {
			return lgt(k, l)
		},
		320)
	}
}
var _hl;
function lgt(k, l) {
	if (_opn == 1 && _tpn == null) {
		return
	};
	_tch = 3;
	var j = d31[l][k][0];
	if (_gs == 0) {
		_es()
	};
	if (_tpn == null) {
		if (j == 2) {
			crm(++RM)
		};
		o0o(k, l)
	} else {
		M5k(k, l)
	}
}
var tc0 = 0;
function _75(g) {
	if (_tch == 1) {
		var h = paf['getBoundingClientRect']();
		var k = Math['floor']((g['changedTouches'][0]['clientX'] - h['left']) / 25);
		var l = Math['floor']((g['changedTouches'][0]['clientY'] - h['top']) / 25);
		var j = d31[l][k][0];
		if (_gs == 0) {
			_es()
		};
		if (j != 1) {
			if (_tpn == null) {
				var m = Date['now']();
				var n;
				if (k == _x0 && l == _y0) {
					n = m - tc0
				} else {
					_x0 = k;
					_y0 = l;
					tc0 = Date['now']();
					n = 1000
				};
				if (_opn == 1 && n < 400 && j == 0) {
					o0o(k, l)
				} else {
					M5k(k, l)
				}
			} else {
				if (j != 2) {
					o0o(k, l)
				}
			}
		};
		_tch = 3;
		clearTimeout(_hl);
		tc0 = m
	};
	if (g['preventDefault']) {
		g['preventDefault']()
	} else {
		window['event']['returnValue'] = false
	}
}
function _d46() {
	_edn();
	he = 0;
	_tch = 0;
	_mp1 = localStorage['getItem']('mp1');
	_mp2 = localStorage['getItem']('mp2');
	_tpn = localStorage['getItem']('tpn');
	_opn = localStorage['getItem']('opn');
	var u = X * 25;
	$('p42')['style']['width'] = u + 4 + 'px';
	paf['width'] = u;
	paf['height'] = Y * 25;
	$('face')['src'] = gif[0];
	for (var f = 0; f < X; f++) {
		for (var t = 0; t < Y; t++) {
			ctx['drawImage'](gfs[0], f * 25, t * 25)
		}
	};
	paf['onmousedown'] = function(g) {
		_65(g)
	};
	paf['onmouseup'] = function(g) {
		_67(g)
	};;;
	paf['ontouchstart'] = function(g) {
		_77(g)
	};
	paf['ontouchmove'] = function() {
		_tch = 2;
		clearTimeout(_hl)
	};
	paf['ontouchend'] = function(g) {
		_75(g)
	};
	crm(RM);
	ces(0)
}
document['oncontextmenu'] = function() {
	return false
};
document['onselectstart'] = function() {
	return false
};
function sopen() {
	var T = 0;
	var U = -1,
	V = -1;
	for (var f = 0; f < X; f++) {
		var W = 0;
		for (var t = 0; t < Y; t++) {
			if (d31[t][f][2] == 0 && d31[t][f][1] == 0) {
				W++
			} else {
				if (W > T) {
					T = W;
					U = f;
					V = t - 1
				};
				W = 0
			}
		};
		if (W > T) {
			T = W;
			U = f;
			V = t - 1
		}
	};
	if (U >= 0 && V >= 0) {
		o0o(U, V)
	}
}
function _r39(A) {
	return Math['floor'](Math['random']() * A)
}
function _edn() {
	if (he > 0) {
		clearInterval(he);
		he = 0;
		_t0 = Date['now']() - _t0;
		ces(parseInt(_t0 / 1000));
		_t0 = Math['ceil'](_t0 / 100)
	} else {
		_t0 = 0
	}
}
var he = 0;
var _t0;
var e33;
function _es() {
	_t0 = Date['now']();
	e33 = 0;
	_gs = 1;
	he = setInterval(function() {
		ces(++e33)
	},
	1000)
}
var _tpn;
var _opn;
var _tch;
_h = window['location']['href'];
var RM;
var RB;
function M5k(k, l) {
	if (d31[l][k][0] == 0) {
		if (RM > 0) {
			ctx['drawImage'](gfs[1], k * 25, l * 25);
			d31[l][k][0] = 2;
			crm(--RM)
		}
	} else {
		if (d31[l][k][0] == 2) {
			ctx['drawImage'](gfs[0], k * 25, l * 25);
			d31[l][k][0] = 0;
			crm(++RM)
		}
	}
}
var df5 = localStorage['getItem']('df5');
if (df5 == null) {
	$('hm')['value'] = 15;
	$('vm')['value'] = 15;
	$('mm')['value'] = 20
} else {
	var cv = df5['split'](';');
	$('hm')['value'] = cv[0];
	$('vm')['value'] = cv[1];
	$('mm')['value'] = cv[2]
};
function start() {
	_123(localStorage['getItem']('ch7'));
	on();
	sid();
	ad()
}
function un() {
	var Z = localStorage['getItem']('uid');
	if (Z != null) {
		var S = Z['split']('.');
		if (S['length'] > 1) {
			Z = S[0];
			localStorage['setItem']('uid', Z)
		};
		if (Z['length'] < 2 || isNaN(Z)) {
			Z = null
		}
	};
	return Z
}
function sid() {
	$('uid')['innerHTML'] = un()
}
function on() {
	setTimeout(on, 180000)
}
function getuid() {
	up();
	sid();
}
function _123(d) {
	var c = document['body']['clientWidth'];
	var b = document['body']['clientHeight'];
	if (d == null) {
		d = c < 560 ? 1 : 2
	};
	_v = d;
	$('custom')['style']['display'] = d == 5 ? '': 'none';
	if (d == 1) {
		X = 9;
		Y = 9;
		M = 10
	} else {
		if (d == 2) {
			X = 16;
			Y = 16;
			M = 40
		} else {
			if (d == 3) {
				M = 99;
				if (c >= b) {
					X = 30;
					Y = 16
				} else {
					X = 16;
					Y = 30
				}
			} else {
				if (d == 4) {
					X = parseInt((c - 18) / 25);
					Y = parseInt((b - 54) / 25);
					var e = X * Y;
					if (e >= 480) {
						M = e * 0.20625
					} else {
						M = e * e / 5760 + e / 8
					};
					M = parseInt(M)
				} else {
					if (d == 5) {
						X = $('hm')['value'];
						Y = $('vm')['value'];
						M = $('mm')['value'];
						if (M > X * Y) {
							M = X * Y
						}
					} else {
						return
					}
				}
			}
		}
	};
	_45();
	localStorage['setItem']('ch7', d);
	$('ss')['href'] = 'scores.htm#' + _v
}
function udf() {
	_123(5);
	localStorage['setItem']('df5', $('hm')['value'] + ';' + $('vm')['value'] + ';' + $('mm')['value'])
}