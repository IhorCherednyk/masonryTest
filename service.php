<?php
GLOBAL $response;
$response = ['status' => 'error', 'message' => '', 'data' => []];

if(isset($_REQUEST['action']) && !empty($_REQUEST['action']))
{
	switch ($_REQUEST['action']) {
		case 'getImageByResolution':
			getImageByResolution();
		break;
		default:
			sendResponse($response);
	}
} else {
	$response['status']  = 'error';
	$response['message'] = 'No action parameter';
	sendResponse($response);
}

function getImageByResolution() {

	$images = [
		'640' => [
			'sdfihsdflgsdifga'  => ['isActive' => false, ['img/horizontal/1920х1089.jpg', 'img/horizontal/1920х1089.jpg']],
			'sdfihsdflgsdifga2' => ['isActive' => false, ['img/horizontal/1920х1280.jpg']],
			'sdfihsdflgsdifga3' => ['isActive' => true, ['img/horizontal/2000х1333.jpg', 'img/horizontal/2000х1333.jpg']],
			'sdfihsdflgsdifga4' => ['isActive' => false, ['img/horizontal/2560х1600.jpg']],
		],
		'1024' => [
			'sdfihsdflgsdifga'   => ['isActive' => false, ['img/vertical/1280х1920.jpg']],
			'sdfihsdflgsdifga2' => ['isActive' => false, ['img/vertical/1500х2000.jpg', 'img/vertical/1500х2000.jpg']],
			'sdfihsdflgsdifga3' => ['isActive' => false, ['img/vertical/2840х4260.jpg']],
			'sdfihsdflgsdifga4' => ['isActive' => true, ['img/vertical/3400х4963.jpg', 'img/vertical/1500х2000.jpg']],
		]
	];

	if(isset($_REQUEST['currentWidth']) && !empty($_REQUEST['currentWidth'])) {
		$imagesWithCorrectSize = array();
		if($_REQUEST['currentWidth'] > 1024) {
			$imagesWithCorrectSize = $images['1024'];
		} else if ($_REQUEST['currentWidth'] < 1024) {
			$imagesWithCorrectSize = $images['640'];
		}

		$hash = false;
		// if we get hash from frontend - set active element by it
		if(isset($_REQUEST['bundleHash']) && !empty($_REQUEST['bundleHash']) && strlen($_REQUEST['bundleHash']) > 2) {
			$hash = $_REQUEST['bundleHash'];
			$hash = str_replace('#', '', $hash);
			// check underscore in hash to support double images links sent from mobiles. Improve all "if conditions" here!
			if(strpos($hash, '_') > 0) {
				$parts = explode('_', $hash);
				$hash = $parts[0];
			}
		}

		// check if image with such hash exists (if hash is not false)
		if($hash) {
			if(isset($imagesWithCorrectSize[$hash])) {
				foreach($imagesWithCorrectSize as $key => $value) {
					$imagesWithCorrectSize[$key]['isActive'] = false;
					if($key == $hash) {
						$imagesWithCorrectSize[$key]['isActive'] = true;
					}
				}
			} else {
				// show 404 page
				$response['status']  = 'error';
				$response['message'] = 'Bundle with such hash not found. Show 404 page here';
				sendResponse($response);
			}
		}

		// check if mobile - transform response so it returns double images in one bundle as 2 separate images
		if ($_REQUEST['currentWidth'] < 1024) {
			$newFinalArrayOfImages = array();
			foreach($imagesWithCorrectSize as $key => $value) {
				if(sizeof($value[0]) > 1) // we have 2 images in 1 bundle
				{
					$newFinalArrayOfImages[$key] = ['isActive' => $value['isActive'], [$value[0][0]]];
					$newFinalArrayOfImages[$key.'_2'] = ['isActive' => false, [$value[0][1]]];
				} else {
					$newFinalArrayOfImages[$key] = $value;
				}
			}
			$imagesWithCorrectSize = $newFinalArrayOfImages;
		}
		
		$response['status']  = 'success';
		$response['data']    = $imagesWithCorrectSize;
	} else {
		$response['status']  = 'error';
		$response['message'] = 'No currentResolution parameter';
	}
	sendResponse($response);
}

function sendResponse($response) {
	echo json_encode($response); die();
}

?>