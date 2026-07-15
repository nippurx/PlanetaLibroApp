<?php

declare(strict_types=1);

namespace PlanetaLibro\Api\V1\Reader;

use RuntimeException;

final class ReaderManifestException extends RuntimeException
{
    private string $errorCode;
    private int $httpStatus;

    public function __construct(string $errorCode, string $message, int $httpStatus)
    {
        parent::__construct($message);
        $this->errorCode = $errorCode;
        $this->httpStatus = $httpStatus;
    }

    public function errorCode(): string
    {
        return $this->errorCode;
    }

    public function httpStatus(): int
    {
        return $this->httpStatus;
    }
}
