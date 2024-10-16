Change log
================================================

All notable changes to the LaunchDarkly Relay Proxy Helm Chart will be documented in this file. This project adheres to [Semantic Versioning](https://semver.org).


## [3.4.0](https://github.com/80486858/repo-4/compare/v3.3.0...3.4.0) (2024-10-16)


### Features

* Add option to define terminationGracePeriodSeconds ([#60](https://github.com/80486858/repo-4/issues/60)) ([f65b60b](https://github.com/80486858/repo-4/commit/f65b60b0cc0f1f956e3a951042095583e85cd542))
* Add pod priorityClassName support ([#53](https://github.com/80486858/repo-4/issues/53)) ([e28b01b](https://github.com/80486858/repo-4/commit/e28b01b1b7437332bbb73a522f7b739cb670809d))
* Add support for container lifecycle hooks ([#57](https://github.com/80486858/repo-4/issues/57)) ([f47acc6](https://github.com/80486858/repo-4/commit/f47acc6a94a76c0550dfce2dfb4d5d793bdc9050))
* Add support for user-defined pod labels ([#30](https://github.com/80486858/repo-4/issues/30)) ([99e105d](https://github.com/80486858/repo-4/commit/99e105d998efdb3dde9d6a3448e2b642c111cce8))
* Add TopologySpreadConstraint and PodDistruptionBudget support ([#47](https://github.com/80486858/repo-4/issues/47)) ([9bdecf9](https://github.com/80486858/repo-4/commit/9bdecf9d0a4ef08c94b81850c0cfd81af7b4146a))
* Default to 7.2.1 version of the relay proxy ([#28](https://github.com/80486858/repo-4/issues/28)) ([7cd59d5](https://github.com/80486858/repo-4/commit/7cd59d505e93585fd8e8bcb35ae15d7afb2fec60))
* Introduce top level pod configuration value ([#31](https://github.com/80486858/repo-4/issues/31)) ([beb0f9e](https://github.com/80486858/repo-4/commit/beb0f9efae74be389b40c618275d4138adcaab96))
* Remove deprecated pod values ([#52](https://github.com/80486858/repo-4/issues/52)) ([444fc60](https://github.com/80486858/repo-4/commit/444fc6079a053bd6e218c2ca8a85b3c58e89888b))
* Support Dynamic EnvFrom existing K8s Secrets ([#45](https://github.com/80486858/repo-4/issues/45)) ([ae145e8](https://github.com/80486858/repo-4/commit/ae145e8d7d1460baafc06a6e10c51e05c360a9f4))
* Support environment variables with reference values ([#35](https://github.com/80486858/repo-4/issues/35)) ([7d9c1e6](https://github.com/80486858/repo-4/commit/7d9c1e63c8a97e3c20891c9aa486d54c1eb54ad1))
* Update default relay to v8.2.0 ([#51](https://github.com/80486858/repo-4/issues/51)) ([c82d92d](https://github.com/80486858/repo-4/commit/c82d92d65754939d1609a696eba9adfc45aa17ee))


### Bug Fixes

* Allow multiple secrets to be mounted as volumes ([#37](https://github.com/80486858/repo-4/issues/37)) ([4e9cd5c](https://github.com/80486858/repo-4/commit/4e9cd5c19f30af59a995f79a5cdb0862d5a1b3ea))
* Allow overriding scheme for container probes ([#39](https://github.com/80486858/repo-4/issues/39)) ([846d783](https://github.com/80486858/repo-4/commit/846d7835103c4ed9a571f2ce050f6492484e4055))
* Pass unit tests by fixing golden files ([831fc3f](https://github.com/80486858/repo-4/commit/831fc3fc654836c8570acc1a4d71f650e024afa8))

## [3.3.0](https://github.com/launchdarkly/ld-relay-helm/compare/3.2.0...3.3.0) (2024-03-19)


### Features

* Add option to define terminationGracePeriodSeconds ([#60](https://github.com/launchdarkly/ld-relay-helm/issues/60)) ([f65b60b](https://github.com/launchdarkly/ld-relay-helm/commit/f65b60b0cc0f1f956e3a951042095583e85cd542))

## [3.2.0] - 2024-02-21
### Added:
- Add support for container lifecycle hooks. (Thanks, [Helinanu](https://github.com/launchdarkly/ld-relay-helm/pull/57)!)

## [3.1.0] - 2023-12-01
### Added:
- Support setting a pod's priority class name. (Thanks, [kh3dron](https://github.com/launchdarkly/ld-relay-helm/pull/53)!)

## [3.0.0] - 2023-10-25
### Changed:
- Updated the default relay image to v8.2.0. To learn more about the changes involved, read [the Relay Changelog](https://github.com/launchdarkly/ld-relay/blob/v8/CHANGELOG.md).

### Removed:
- Removed previously deprecated config option `podAnnotations`. Use `pod.annotations` instead.
- Removed previously deprecated config option `podSecurityContext`. Use `pod.securityContext` instead.

## [2.4.0] - 2023-07-20
### Added:
- Support TopologySpreadConstraint and PodDistruptionBudget. (Thanks, [pjaak](https://github.com/launchdarkly/ld-relay-helm/pull/47)!)

## [2.3.0] - 2023-07-04
### Added:
- Support Dynamic EnvFrom existing K8s Secrets. (Thanks, [LiamStorkey](https://github.com/launchdarkly/ld-relay-helm/pull/45)!)

## [2.2.2] - 2023-05-11
### Fixed:
- Liveness and readiness probes, by default use an HTTP scheme. This breaks once TLS is enabled in the relay. values file now updated to allow these schemes to be overridden.

## [2.2.1] - 2023-05-10
### Fixed:
- Fix name collision when setting multiple secret values as volume mounts.

### Removed:
- `relay.secrets.volumeName` is no longer used when mounting secrets as volumes as all secrets as mounted within a shared volume.

## [2.2.0] - 2023-04-27
### Added:
- Support setting environment variables directly on the container spec through `relay.environmentVariables`. This enables more complex variable definitions. (Thanks, [uristernik](https://github.com/launchdarkly/ld-relay-helm/pull/34)!)

## [2.1.0] - 2023-04-05
### Added:
- Add ability to set labels on pods through `pod.labels` value. (Thanks, [kovaxur](https://github.com/launchdarkly/ld-relay-helm/pull/30)!)

### Deprecated:
- `podAnnotations` and `podSecurityContext` values have been deprecated. Use `pod.annotations` and `pod.securityContext` instead.

## [2.0.0] - 2023-03-24
### Changed:
- Updated default Relay Proxy version to v7.2.1 to support [contexts](https://docs.launchdarkly.com/home/contexts).

## [1.2.1] - 2023-02-24
### Changed:
- (Tests) Bumped golang.org/x/text from 0.3.6 to 0.3.8
- (Tests) Bumped golang.org/x/net from 0.0.0-20210614182718-04defd469f4e to 0.7.0
- (Tests) Bumped golang.org/x/crypto from 0.0.0-20210513164829-c07d793c2f9a to 0.1.0

## [1.2.0] - 2023-01-25
### Changed:
- Updated HorizontalPodAutoscaler to be compatible with older versions of Kubernetes. (Thanks, [guifl](https://github.com/launchdarkly/ld-relay-helm/pull/21)!)

## [1.1.0] - 2022-11-16
### Added:
- Allow setting annotations on the created service.
- Add mechanism for mounting secrets as files.

## [1.0.1] - 2022-11-07
### Fixed:
- Restart running containers if the ConfigMap values change.

## [1.0.0] - 2022-10-14
### Added:
- Initial release of the LaunchDarkly Relay Proxy Helm Chart
